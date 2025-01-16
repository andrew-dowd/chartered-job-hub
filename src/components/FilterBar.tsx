import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export const FilterBar = () => {
  const [salaryRange, setSalaryRange] = useState([40, 100]);
  
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

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow-sm rounded-lg items-center">
      <div className="flex-1 min-w-[200px] max-w-[300px]">
        <div className="space-y-1">
          <label className="text-sm font-medium">Salary (€{salaryRange[0]}k - €{salaryRange[1]}k)</label>
          <Slider
            defaultValue={[40, 100]}
            max={200}
            min={30}
            step={5}
            value={salaryRange}
            onValueChange={setSalaryRange}
          />
        </div>
      </div>

      <Select>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-2">0-2 years</SelectItem>
          <SelectItem value="3-5">3-5 years</SelectItem>
          <SelectItem value="5+">5+ years</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {IRISH_LOCATIONS.map((location) => (
            <SelectItem key={location} value={location.toLowerCase()}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" className="whitespace-nowrap">Clear Filters</Button>
    </div>
  );
};