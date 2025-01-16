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
  const [salaryRange, setSalaryRange] = useState([40]);
  
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
    <div className="flex flex-col gap-6 p-6 bg-white shadow-sm rounded-lg">
      <div className="space-y-2">
        <label className="text-sm font-medium">Salary Range (€)</label>
        <div className="space-y-4">
          <Slider
            defaultValue={[40]}
            max={200}
            min={30}
            step={5}
            value={salaryRange}
            onValueChange={setSalaryRange}
            className="w-full"
          />
          <div className="text-sm text-gray-500">
            €{salaryRange}k+
          </div>
        </div>
      </div>

      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Experience Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-2">0-2 years</SelectItem>
          <SelectItem value="3-5">3-5 years</SelectItem>
          <SelectItem value="5+">5+ years</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-full">
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

      <Button variant="outline" className="w-full">Clear Filters</Button>
    </div>
  );
};