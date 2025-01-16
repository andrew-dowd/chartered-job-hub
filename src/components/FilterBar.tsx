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
import { Search } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search job titles..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 h-12 w-full rounded-lg border-gray-200"
            />
          </div>
        </div>

        {/* Salary Range */}
        <div className="min-w-[240px] border-l border-gray-200 pl-4">
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
              className="w-32"
            />
            <span className="text-sm text-gray-600">€{salaryRange[1]}k</span>
          </div>
        </div>

        {/* Experience Level */}
        <div className="min-w-[160px] border-l border-gray-200 pl-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Experience</p>
          <Select onValueChange={onExperienceChange}>
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue placeholder="Select years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="min-w-[160px] border-l border-gray-200 pl-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Location</p>
          <Select onValueChange={onLocationChange}>
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {IRISH_LOCATIONS.map((location) => (
                <SelectItem 
                  key={location} 
                  value={location.toLowerCase()}
                >
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button 
          onClick={onClearFilters}
          className="h-12 w-12 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center p-0"
          size="icon"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};