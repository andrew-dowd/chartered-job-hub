import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Checkbox } from "@/components/ui/checkbox";

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
  
  const LOCATIONS = [
    "Dublin",
    "Leinster",
    "Munster",
    "Connacht",
    "Ulster",
    "Remote",
    "International"
  ];

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

  const handleMinSalaryChange = (value: number[]) => {
    setMinSalary(value[0]);
    onMinSalaryChange(value[0], includeMissingSalary);
    trackFilterEvent('salary', value[0]);
  };

  const handleIncludeMissingSalaryChange = (checked: boolean) => {
    setIncludeMissingSalary(checked);
    onMinSalaryChange(minSalary, checked);
    trackFilterEvent('include_missing_salary', checked ? 'true' : 'false');
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
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="flex-1 min-w-0 md:min-w-[200px]">
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

        <div className="w-full md:w-auto md:min-w-[240px] md:border-l md:border-gray-200 md:pl-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Minimum Salary</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 min-w-[48px]">€{minSalary}k</span>
            <Slider
              defaultValue={[30]}
              max={200}
              min={30}
              step={5}
              value={[minSalary]}
              onValueChange={handleMinSalaryChange}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 text-right">€200k</span>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <Checkbox
              id="includeMissingSalary"
              checked={includeMissingSalary}
              onCheckedChange={handleIncludeMissingSalaryChange}
            />
            <label
              htmlFor="includeMissingSalary"
              className="text-sm text-gray-600 cursor-pointer"
            >
              Include jobs without salary
            </label>
          </div>
        </div>

        <div className="w-full md:w-auto md:min-w-[160px] md:border-l md:border-gray-200 md:pl-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Experience</p>
          <Select value={experienceValue} onValueChange={handleExperienceChange}>
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue placeholder="Select years" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg">
              <SelectItem value="0-2 years" className="hover:bg-gray-50">0-2 years</SelectItem>
              <SelectItem value="3-5 years" className="hover:bg-gray-50">3-5 years</SelectItem>
              <SelectItem value="5+ years" className="hover:bg-gray-50">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto md:min-w-[160px] md:border-l md:border-gray-200 md:pl-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Location</p>
          <Select value={locationValue} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg">
              {LOCATIONS.map((location) => (
                <SelectItem 
                  key={location} 
                  value={location}
                  className="hover:bg-gray-50"
                >
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleClearFilters}
          className="h-12 w-full md:w-12 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center p-0"
          size="icon"
        >
          {hasActiveFilters ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};