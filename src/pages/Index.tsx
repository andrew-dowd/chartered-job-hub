import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    searchQuery: "",
    minSalary: 30,
    experience: "",
    location: "",
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs with filters:", filters);
      let query = supabase
        .from("jobs")
        .select("*")
        .order("posted_date", { ascending: false });

      if (filters.searchQuery) {
        query = query.ilike("title", `%${filters.searchQuery}%`);
      }

      if (filters.minSalary > 30) {
        query = query.gte("min_salary", filters.minSalary * 1000);
      }

      // Map the experience filter values to the experience_level field
      if (filters.experience) {
        switch (filters.experience) {
          case "0-2":
            query = query.eq("experience_level", "Junior");
            break;
          case "3-5":
            query = query.eq("experience_level", "Mid-Level");
            break;
          case "5+":
            query = query.eq("experience_level", "Senior");
            break;
        }
      }

      if (filters.location) {
        query = query.ilike("location_category", filters.location);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

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
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      ) : jobs.length > 0 ? (
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
              createdAt={job.posted_date}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No jobs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Index;