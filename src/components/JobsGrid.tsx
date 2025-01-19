import { JobCard } from "@/components/JobCard";
import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface JobsGridProps {
  jobs: any[];
  lastJobRef?: (node: any) => void;
  loading?: boolean;
}

export const JobsGrid = forwardRef<HTMLDivElement, JobsGridProps>(
  ({ jobs, lastJobRef, loading }, ref) => {
    return (
      <div className="relative min-h-[200px]">
        {loading && jobs.length === 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div 
                key={`skeleton-${index}`}
                className="h-[360px] bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={jobs.length}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {jobs.map((job, index) => {
              if (jobs.length === index + 1) {
                return (
                  <motion.div 
                    ref={lastJobRef}
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <JobCard
                      id={job.id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary_range || `€${job.salary_min / 1000}k - €${job.salary_max / 1000}k`}
                      description=""
                      reasoning={job.reasoning}
                      applyUrl={job.job_url}
                      postedDate={job.posted_date}
                      minExperience={job.min_experience}
                      locationCategory={job.location_category}
                    />
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <JobCard
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    salary={job.salary_range || `€${job.salary_min / 1000}k - €${job.salary_max / 1000}k`}
                    description=""
                    reasoning={job.reasoning}
                    applyUrl={job.job_url}
                    postedDate={job.posted_date}
                    minExperience={job.min_experience}
                    locationCategory={job.location_category}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

JobsGrid.displayName = "JobsGrid";