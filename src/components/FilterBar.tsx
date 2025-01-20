import { useState } from "react";
import { SearchInput } from "./filters/SearchInput";
import { SalaryFilter } from "./filters/SalaryFilter";
import { ExperienceFilter } from "./filters/ExperienceFilter";
import { LocationFilter } from "./filters/LocationFilter";
import { ClearFiltersButton } from "./filters/ClearFiltersButton";

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
      <div className="flex flex-col gap-4">
        <SearchInput value={searchValue} onChange={handleSearchChange} />
        
        <div className="grid grid-cols-1 md:flex md:flex-nowrap gap-3">
          <div className="grid grid-cols-2 md:flex gap-3 flex-1">
            <div className="col-span-2 md:col-span-1 md:flex-1">
              <SalaryFilter
                minSalary={minSalary}
                includeMissingSalary={includeMissingSalary}
                onMinSalaryChange={handleMinSalaryChange}
              />
            </div>
            <ExperienceFilter
              value={experienceValue}
              onChange={handleExperienceChange}
            />
            <LocationFilter
              value={locationValue}
              onChange={handleLocationChange}
            />
          </div>
          
          <ClearFiltersButton 
            hasActiveFilters={hasActiveFilters}
            onClick={handleClearFilters}
          />
        </div>
      </div>
    </div>
  );
};