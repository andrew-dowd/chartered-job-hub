import { FilterBar } from "@/components/FilterBar";
import { JobsGrid } from "@/components/JobsGrid";
import { useState, useRef, useCallback } from "react";
import { useJobs, JobFilters } from "@/hooks/useJobs";

const Index = () => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<JobFilters>({
    searchQuery: "",
    minSalary: 30,
    experience: "",
    location: "",
  });

  const { jobs, loading, hasMore, totalJobs } = useJobs(page, filters);
  
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
    <div className="space-y-6">
      <FilterBar
        onSearchChange={handleSearchChange}
        onMinSalaryChange={handleMinSalaryChange}
        onExperienceChange={handleExperienceChange}
        onLocationChange={handleLocationChange}
        onClearFilters={handleClearFilters}
      />
      
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <p className="text-lg">
          Found <span className="text-primary font-semibold">{totalJobs}</span> matching jobs
        </p>
      </div>
      
      {jobs.length > 0 ? (
        <JobsGrid jobs={jobs} lastJobRef={lastJobElementRef} />
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