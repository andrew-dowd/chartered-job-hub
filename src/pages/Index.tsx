import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const JOBS_PER_PAGE = 18;

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    searchQuery: "",
    minSalary: 30,
    experience: "",
    location: "",
  });

  // Intersection Observer setup
  const observer = useRef(null);
  const lastJobElementRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log("Loading more jobs...");
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setJobs([]);
    setPage(0);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [filters, page]);

  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs with filters:", filters, "page:", page);
      setLoading(true);

      let query = supabase
        .from("jobs")
        .select("*")
        .order('salary_range', { nullsFirst: false }) // Order by salary_range not null first
        .order('min_experience', { ascending: true }) // Then order by min_experience
        .range(page * JOBS_PER_PAGE, (page + 1) * JOBS_PER_PAGE - 1);

      if (filters.searchQuery) {
        query = query.or(`title.ilike.%${filters.searchQuery}%,company.ilike.%${filters.searchQuery}%`);
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
      
      if (data.length < JOBS_PER_PAGE) {
        setHasMore(false);
      }

      if (page === 0) {
        setJobs(data || []);
      } else {
        setJobs(prevJobs => [...prevJobs, ...(data || [])]);
      }
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
    setFilters(prev => ({ ...prev, searchQuery: search }));
  };

  const handleMinSalaryChange = (minSalary: number) => {
    setFilters(prev => ({ ...prev, minSalary }));
  };

  const handleExperienceChange = (experience: string) => {
    console.log("Experience filter changed:", experience);
    setFilters(prev => ({ ...prev, experience }));
  };

  const handleLocationChange = (location: string) => {
    setFilters(prev => ({ ...prev, location }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      minSalary: 30,
      experience: "",
      location: "",
    });
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
      
      {jobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => {
            if (jobs.length === index + 1) {
              return (
                <div ref={lastJobElementRef} key={job.id}>
                  <JobCard
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    salary={job.salary_range || `€${job.salary_min / 1000}k - €${job.salary_max / 1000}k`}
                    description=""
                    reasoning={job.reasoning}
                    applyUrl={job.job_url}
                    postedDate={job.posted_date}
                    minExperience={job.min_experience}
                  />
                </div>
              );
            } else {
              return (
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
                  minExperience={job.min_experience}
                />
              );
            }
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">
            {loading ? "Loading jobs..." : "No jobs found matching your criteria."}
          </p>
        </div>
      )}
      
      {loading && jobs.length > 0 && (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading more jobs...</p>
        </div>
      )}
    </div>
  );
};

export default Index;