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
import { Search, X, Filter } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterBarProps {
  onSearchChange: (search: string) => void;
  onSalaryChange: (range: number[]) => void;
  onExperienceChange: (experience: string) => void;
  onLocationChange: (location: string) => void;
  onClearFilters: () => void;
}

export const FilterBar = ({
  onSearchChange,
  onSalaryChange,
  onExperienceChange,
  onLocationChange,
  onClearFilters,
}: FilterBarProps) => {
  const [salaryRange, setSalaryRange] = useState([30, 200]);
  const [searchValue, setSearchValue] = useState("");
  const [experienceValue, setExperienceValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const IRISH_LOCATIONS = [
    "All Ireland",
    "Dublin",
    "Cork",
    "Galway",
    "Limerick",
    "Waterford",
    "Belfast",
    "Remote"
  ];

  const handleSalaryChange = (newRange: number[]) => {
    setSalaryRange(newRange);
    onSalaryChange(newRange);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange(value);
  };

  const handleExperienceChange = (value: string) => {
    setExperienceValue(value);
    onExperienceChange(value);
  };

  const handleLocationChange = (value: string) => {
    setLocationValue(value);
    onLocationChange(value === "all ireland" ? "" : value);
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setSalaryRange([30, 200]);
    setExperienceValue("");
    setLocationValue("");
    onClearFilters();
  };

  const hasActiveFilters = searchValue || experienceValue || locationValue || 
    salaryRange[0] !== 30 || salaryRange[1] !== 200;

  const FilterContent = () => (
    <>
      <div className="w-full">
        <p className="text-sm font-medium text-gray-600 mb-1">Salary Range</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">€{salaryRange[0]}k</span>
          <Slider
            defaultValue={[30, 200]}
            max={200}
            min={30}
            step={5}
            value={salaryRange}
            onValueChange={handleSalaryChange}
            className="flex-1"
          />
          <span className="text-sm text-gray-600">€{salaryRange[1]}k</span>
        </div>
      </div>

      <div className="w-full">
        <p className="text-sm font-medium text-gray-600 mb-1">Experience</p>
        <Select value={experienceValue} onValueChange={handleExperienceChange}>
          <SelectTrigger className="w-full bg-white border-gray-200">
            <SelectValue placeholder="Select years" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg">
            <SelectItem value="0-2" className="hover:bg-gray-50">0-2 years</SelectItem>
            <SelectItem value="3-5" className="hover:bg-gray-50">3-5 years</SelectItem>
            <SelectItem value="5+" className="hover:bg-gray-50">5+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <p className="text-sm font-medium text-gray-600 mb-1">Location</p>
        <Select value={locationValue} onValueChange={handleLocationChange}>
          <SelectTrigger className="w-full bg-white border-gray-200">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-lg">
            {IRISH_LOCATIONS.map((location) => (
              <SelectItem 
                key={location} 
                value={location.toLowerCase()}
                className="hover:bg-gray-50"
              >
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6 mt-4 md:mt-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search job titles..."
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 h-12 w-full rounded-lg border-gray-200"
            />
          </div>
        </div>

        {isMobile ? (
          <div className="flex gap-2">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex-1 h-12"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
            {hasActiveFilters && (
              <Button
                onClick={handleClearFilters}
                className="h-12 w-12 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center p-0"
                size="icon"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-4 flex-wrap">
              <FilterContent />
            </div>
            <Button 
              onClick={handleClearFilters}
              className="h-12 w-12 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center p-0 flex-shrink-0"
              size="icon"
            >
              {hasActiveFilters ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </>
        )}
      </div>

      {isMobile && showFilters && (
        <div className="mt-4 flex flex-col gap-4 border-t pt-4">
          <FilterContent />
        </div>
      )}
    </div>
  );
};