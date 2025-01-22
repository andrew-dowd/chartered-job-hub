import { FilterBar } from "@/components/FilterBar";
import { JobsGrid } from "@/components/JobsGrid";
import { useState, useRef, useCallback } from "react";
import { useJobs, JobFilters } from "@/hooks/useJobs";

const Index = () => {
  const [filters, setFilters] = useState<JobFilters>({
    searchQuery: "",
    minSalary: 30,
    maxSalary: 200,
    includeMissingSalary: false,
    experience: "",
    location: "",
    city: "",
  });

  const { jobs, loading, hasMore, totalJobs, setPage } = useJobs(0, filters);
  
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
  }, [loading, hasMore, setPage]);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, searchQuery: search }));
  };

  const handleMinSalaryChange = (minSalary: number, maxSalary: number, includeMissingSalary: boolean) => {
    setFilters(prev => ({ ...prev, minSalary, maxSalary, includeMissingSalary }));
  };

  const handleExperienceChange = (experience: string) => {
    console.log("Experience filter changed:", experience);
    setFilters(prev => ({ ...prev, experience }));
  };

  const handleLocationChange = (location: string) => {
    setFilters(prev => ({ ...prev, location }));
  };

  const handleCityChange = (city: string) => {
    setFilters(prev => ({ ...prev, city }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      minSalary: 30,
      maxSalary: 200,
      includeMissingSalary: false,
      experience: "",
      location: "",
      city: "",
    });
  };

  return (
    <div className="space-y-6">
      <FilterBar
        onSearchChange={handleSearchChange}
        onMinSalaryChange={handleMinSalaryChange}
        onExperienceChange={handleExperienceChange}
        onLocationChange={handleLocationChange}
        onCityChange={handleCityChange}
        onClearFilters={handleClearFilters}
      />
      
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <p className="text-lg">
          Found <span className="text-primary font-semibold">{totalJobs}</span> matching jobs
        </p>
      </div>
      
      <JobsGrid 
        jobs={jobs} 
        lastJobRef={lastJobElementRef} 
        loading={loading}
      />
      
      {loading && jobs.length > 0 && (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading more jobs...</p>
        </div>
      )}
    </div>
  );
};

export default Index;