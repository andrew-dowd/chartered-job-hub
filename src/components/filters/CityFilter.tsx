import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface CityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const CityFilter = ({ value, onChange }: CityFilterProps) => {
  // Top 20 cities in Ireland by population
  const CITIES = [
    "Dublin",
    "Cork",
    "Limerick",
    "Galway",
    "Waterford",
    "Drogheda",
    "Dundalk",
    "Swords",
    "Bray",
    "Navan",
    "Kilkenny",
    "Ennis",
    "Carlow",
    "Tralee",
    "Naas",
    "Sligo",
    "Mullingar",
    "Wexford",
    "Letterkenny",
    "Athlone"
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-12 bg-white border-gray-200">
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-gray-500 shrink-0" />
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