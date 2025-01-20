import { JobCardSkeleton } from "@/components/job-card/JobCardSkeleton";

interface LoadingGridProps {
  count?: number;
  className?: string;
}

export const LoadingGrid = ({ count = 4, className = "" }: LoadingGridProps) => {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <JobCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
};