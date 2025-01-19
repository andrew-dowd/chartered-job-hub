import { JobCard } from "@/components/JobCard";
import { forwardRef } from "react";

interface JobsGridProps {
  jobs: any[];
  lastJobRef?: (node: any) => void;
}

export const JobsGrid = forwardRef<HTMLDivElement, JobsGridProps>(
  ({ jobs, lastJobRef }, ref) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {jobs.map((job, index) => {
          if (jobs.length === index + 1) {
            return (
              <div ref={lastJobRef} key={job.id}>
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
                  locationCategory={job.location_category}
                />
              </div>
            );
          }
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
              locationCategory={job.location_category}
            />
          );
        })}
      </div>
    );
  }
);

JobsGrid.displayName = "JobsGrid";