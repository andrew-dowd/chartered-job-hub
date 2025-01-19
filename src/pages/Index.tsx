import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const JOBS_PER_PAGE = 9;

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    searchQuery: "",
    minSalary: 30,
    experience: "",
    location: "",
  });

  useEffect(() => {
    fetchJobs();
  }, [filters, currentPage]);

  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs with filters:", filters);
      setLoading(true);

      // First, get total count
      let countQuery = supabase
        .from("jobs")
        .select("*", { count: "exact", head: true });

      if (filters.searchQuery) {
        countQuery = countQuery.ilike("title", `%${filters.searchQuery}%`);
      }
      if (filters.minSalary > 30) {
        countQuery = countQuery.gte("min_salary", filters.minSalary * 1000);
      }
      if (filters.experience) {
        countQuery = countQuery.eq("experience_level", filters.experience);
      }
      if (filters.location) {
        countQuery = countQuery.ilike("location_category", filters.location);
      }

      const { count, error: countError } = await countQuery;

      if (countError) throw countError;
      setTotalJobs(count || 0);

      // Then fetch paginated data
      let query = supabase
        .from("jobs")
        .select("*")
        .order("posted_date", { ascending: false })
        .range((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE - 1);

      if (filters.searchQuery) {
        query = query.ilike("title", `%${filters.searchQuery}%`);
      }
      if (filters.minSalary > 30) {
        query = query.gte("min_salary", filters.minSalary * 1000);
      }
      if (filters.experience) {
        query = query.eq("experience_level", filters.experience);
      }
      if (filters.location) {
        query = query.ilike("location_category", filters.location);
      }

      const { data, error } = await query;

      if (error) throw error;

      console.log("Fetched jobs:", data);
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (search: string) => {
    setCurrentPage(1); // Reset to first page on new search
    setFilters(prev => ({ ...prev, searchQuery: search }));
  };

  const handleMinSalaryChange = (minSalary: number) => {
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, minSalary }));
  };

  const handleExperienceChange = (experience: string) => {
    setCurrentPage(1);
    console.log("Experience filter changed:", experience);
    setFilters(prev => ({ ...prev, experience }));
  };

  const handleLocationChange = (location: string) => {
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, location }));
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
    setFilters({
      searchQuery: "",
      minSalary: 30,
      experience: "",
      location: "",
    });
  };

  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <div className="space-y-8">
      <FilterBar
        onSearchChange={handleSearchChange}
        onMinSalaryChange={handleMinSalaryChange}
        onExperienceChange={handleExperienceChange}
        onLocationChange={handleLocationChange}
        onClearFilters={handleClearFilters}
      />
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      ) : jobs.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary_range || `€${job.salary_min / 1000}k - €${job.salary_max / 1000}k`}
                description=""
                reasoning={job.reasoning}
                applyUrl={job.job_url}
                postedDate={job.posted_date}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination className="my-8">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                  </PaginationItem>
                )}
                
                {renderPaginationItems()}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No jobs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Index;