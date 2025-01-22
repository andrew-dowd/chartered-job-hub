import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";

interface CityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const CityFilter = ({ value, onChange }: CityFilterProps) => {
  const CITIES = [
    "Dublin",
    "Cork",
    "Galway",
    "Limerick",
    "Waterford",
    "Belfast",
    "Derry",
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-12 bg-white border-gray-200">
        <div className="flex items-center">
          <Building2 className="mr-2 h-4 w-4 text-gray-500 shrink-0" />
          <SelectValue placeholder="City" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-lg">
        {CITIES.map((city) => (
          <SelectItem 
            key={city} 
            value={city}
            className="hover:bg-gray-50"
          >
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};