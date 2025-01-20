import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface ClearFiltersButtonProps {
  hasActiveFilters: boolean;
  onClick: () => void;
}

export const ClearFiltersButton = ({ hasActiveFilters, onClick }: ClearFiltersButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      className="h-12 w-full md:w-12 bg-primary hover:bg-primary/90 rounded-lg md:rounded-full flex items-center justify-center p-0"
      size="icon"
      aria-label={hasActiveFilters ? "Clear filters" : "Search"}
    >
      {hasActiveFilters ? (
        <X className="h-5 w-5" />
      ) : (
        <Search className="h-5 w-5" />
      )}
    </Button>
  );
};