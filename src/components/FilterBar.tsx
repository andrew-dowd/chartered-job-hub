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
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4 overflow-x-auto">
          {/* Search Input */}
          <div className="flex-1 min-w-[200px] relative">
            <Input
              type="text"
              placeholder="Search job titles..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 h-12 rounded-full border-gray-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>

          {/* Salary Range */}
          <div className="min-w-[200px] px-4 border-x border-gray-200">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Salary Range</p>
              <p className="text-sm">€{salaryRange[0]}k - €{salaryRange[1]}k</p>
              <Slider
                defaultValue={[30, 200]}
                max={200}
                min={30}
                step={5}
                value={salaryRange}
                onValueChange={handleSalaryChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Experience Level */}
          <div className="min-w-[140px] px-4 border-r border-gray-200">
            <p className="text-sm font-medium text-gray-600 mb-1">Experience</p>
            <Select onValueChange={onExperienceChange}>
              <SelectTrigger className="w-full bg-white border-gray-300">
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="0-2" className="hover:bg-gray-100">0-2 years</SelectItem>
                <SelectItem value="3-5" className="hover:bg-gray-100">3-5 years</SelectItem>
                <SelectItem value="5+" className="hover:bg-gray-100">5+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="min-w-[140px] px-4 border-r border-gray-200">
            <p className="text-sm font-medium text-gray-600 mb-1">Location</p>
            <Select onValueChange={onLocationChange}>
              <SelectTrigger className="w-full bg-white border-gray-300">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {IRISH_LOCATIONS.map((location) => (
                  <SelectItem 
                    key={location} 
                    value={location.toLowerCase()}
                    className="hover:bg-gray-100"
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
            className="min-w-[100px] h-12 rounded-full bg-primary hover:bg-primary/90"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};