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

interface FilterBarProps {
  onSearchChange: (search: string) => void;
  onMinSalaryChange: (minSalary: number) => void;
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
  const [searchValue, setSearchValue] = useState("");
  const [experienceValue, setExperienceValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  
  const LOCATIONS = [
    "Dublin",
    "Leinster",
    "Munster",
    "Connacht",
    "Ulster",
    "Remote",
    "International"
  ];

  const handleMinSalaryChange = (value: number[]) => {
    setMinSalary(value[0]);
    onMinSalaryChange(value[0]);
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
    onLocationChange(value.toLowerCase());
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setMinSalary(30);
    setExperienceValue("");
    setLocationValue("");
    onClearFilters();
  };

  const hasActiveFilters = searchValue || experienceValue || locationValue || minSalary !== 30;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mt-8">
      <div className="flex items-center gap-4">
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

        <div className="min-w-[240px] border-l border-gray-200 pl-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Minimum Salary</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">€{minSalary}k</span>
            <Slider
              defaultValue={[30]}
              max={200}
              min={30}
              step={5}
              value={[minSalary]}
              onValueChange={handleMinSalaryChange}
              className="w-32"
            />
            <span className="text-sm text-gray-600">€200k</span>
          </div>
        </div>

        <div className="min-w-[160px] border-l border-gray-200 pl-4">
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

        <div className="min-w-[160px] border-l border-gray-200 pl-4">
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
          className="h-12 w-12 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center p-0"
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