import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const LocationFilter = ({ value, onChange }: LocationFilterProps) => {
  const LOCATIONS = [
    "Dublin",
    "Leinster",
    "Munster",
    "Connacht",
    "Ulster",
    "Remote",
    "International"
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] h-12 bg-white border-gray-200">
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-gray-500" />
          <SelectValue placeholder="Location" />
        </div>
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
  );
};