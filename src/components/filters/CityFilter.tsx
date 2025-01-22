import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const CityFilter = ({ value, onChange }: CityFilterProps) => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      console.log("Fetching unique cities from jobs table...");
      const { data, error } = await supabase
        .from('jobs')
        .select('city')
        .not('city', 'is', null)
        .order('city');

      if (error) {
        console.error("Error fetching cities:", error);
        return;
      }

      // Extract unique cities and remove nulls
      const uniqueCities = Array.from(new Set(data.map(row => row.city)))
        .filter(Boolean)
        .sort();

      console.log("Found cities:", uniqueCities);
      setCities(uniqueCities);
      setLoading(false);
    };

    fetchCities();
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-12 bg-white border-gray-200">
        <div className="flex items-center">
          <Building2 className="mr-2 h-4 w-4 text-gray-500 shrink-0" />
          <SelectValue placeholder={loading ? "Loading cities..." : "City"} />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-lg">
        {cities.map((city) => (
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