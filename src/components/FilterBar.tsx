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
    <div className="space-y-4 bg-white shadow-sm rounded-lg p-4">
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search job titles..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px] max-w-[300px]">
          <div className="space-y-1">
            <label className="text-sm font-medium">Salary (€{salaryRange[0]}k - €{salaryRange[1]}k)</label>
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

        <Select onValueChange={onExperienceChange}>
          <SelectTrigger className="w-[140px] bg-white">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="0-2" className="hover:bg-gray-100">0-2 years</SelectItem>
            <SelectItem value="3-5" className="hover:bg-gray-100">3-5 years</SelectItem>
            <SelectItem value="5+" className="hover:bg-gray-100">5+ years</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onLocationChange}>
          <SelectTrigger className="w-[140px] bg-white">
            <SelectValue placeholder="Location" />
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

        <Button variant="outline" onClick={onClearFilters} className="whitespace-nowrap">
          Clear Filters
        </Button>
      </div>
    </div>
  );
};