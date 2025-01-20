import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SalaryFilter } from "./filters/SalaryFilter";
import { ExperienceFilter } from "./filters/ExperienceFilter";
import { LocationFilter } from "./filters/LocationFilter";

interface FilterBarProps {
  onSearchChange: (search: string) => void;
  onMinSalaryChange: (minSalary: number, includeMissingSalary: boolean) => void;
  onExperienceChange: (experience: string) => void;
  onLocationChange: (location: string) => void;
  onClearFilters: () => void;
}

export const FilterBar = ({
  onSearchChange,
  onMinSalaryChange,
  onExperienceChange,
  onLocationChange,
  onClearFilters,
}: FilterBarProps) => {
  const [minSalary, setMinSalary] = useState(30);
  const [includeMissingSalary, setIncludeMissingSalary] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [experienceValue, setExperienceValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const isMobile = useIsMobile();

  const trackFilterEvent = (filterName: string, value: string | number) => {
    if (window.plausible) {
      window.plausible('Filter Used', {
        props: {
          filter: filterName,
          value: String(value)
        }
      });
    }
  };

  const handleMinSalaryChange = (value: number, includeMissing: boolean) => {
    setMinSalary(value);
    setIncludeMissingSalary(includeMissing);
    onMinSalaryChange(value, includeMissing);
    trackFilterEvent('salary', value);
    if (includeMissing !== includeMissingSalary) {
      trackFilterEvent('include_missing_salary', includeMissing ? 'true' : 'false');
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange(value);
    if (value.length > 2) {
      trackFilterEvent('search', value);
    }
  };

  const handleExperienceChange = (value: string) => {
    setExperienceValue(value);
    onExperienceChange(value);
    trackFilterEvent('experience', value);
  };

  const handleLocationChange = (value: string) => {
    setLocationValue(value);
    onLocationChange(value.toLowerCase());
    trackFilterEvent('location', value);
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setMinSalary(30);
    setExperienceValue("");
    setLocationValue("");
    setIncludeMissingSalary(false);
    onClearFilters();
    trackFilterEvent('clear_filters', 'all');
  };

  const hasActiveFilters = searchValue || experienceValue || locationValue || minSalary !== 30 || includeMissingSalary;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="flex-1 min-w-0 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={isMobile ? "Search jobs..." : "Search jobs by title or company..."}
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 h-12 w-full rounded-lg border-gray-200"
            />
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-2 items-center">
          <SalaryFilter
            minSalary={minSalary}
            includeMissingSalary={includeMissingSalary}
            onMinSalaryChange={handleMinSalaryChange}
          />
          <ExperienceFilter
            value={experienceValue}
            onChange={handleExperienceChange}
          />
          <LocationFilter
            value={locationValue}
            onChange={handleLocationChange}
          />
          
          <Button 
            onClick={handleClearFilters}
            className="h-12 w-12 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center p-0"
            size="icon"
            aria-label={hasActiveFilters ? "Clear filters" : "Search"}
          >
            {hasActiveFilters ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};