import { motion } from "framer-motion";
import { JobCard } from "@/components/JobCard";
import { Job } from "@/types/job";

interface JobsListProps {
  jobs: Job[];
  lastJobRef?: (node: any) => void;
}

export const JobsList = ({ jobs, lastJobRef }: JobsListProps) => {
  console.log("Jobs data in JobsList:", jobs); // Debug log
  
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
              description={job.description}
              reasoning={job.reasoning}
              job_url={job.job_url}
              posted_date={job.posted_date}
              min_experience={job.min_experience}
              location_category={job.location_category}
              routine={job.routine}
              responsibilities={job.responsibilities}
              perks={job.perks}
              industry={job.industry}
              employment_type={job.employment_type}
              qualification={job.qualification}
              other_key_experience={job.other_key_experience}
            />
          </motion.div>
        );
      })}
    </div>
  );
};