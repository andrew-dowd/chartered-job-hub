import { forwardRef } from "react";
import { JobsList } from "./jobs/JobsList";
import { LoadingGrid } from "./jobs/LoadingGrid";

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
          <LoadingGrid count={8} />
        )}
        
        <JobsList jobs={jobs} lastJobRef={lastJobRef} />

        {loading && jobs.length > 0 && (
          <LoadingGrid count={4} className="mt-6" />
        )}
      </div>
    );
  }
);

JobsGrid.displayName = "JobsGrid";