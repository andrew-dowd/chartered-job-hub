import { motion } from "framer-motion";
import { JobCard } from "@/components/JobCard";
import { Job } from "@/types/job";

interface JobsListProps {
  jobs: Job[];
  lastJobRef?: (node: any) => void;
}

export const JobsList = ({ jobs, lastJobRef }: JobsListProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {jobs.map((job, index) => {
        const isLastElement = jobs.length === index + 1;
        
        return (
          <motion.div
            key={job.id}
            ref={isLastElement ? lastJobRef : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            layout
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
    </div>
  );
};