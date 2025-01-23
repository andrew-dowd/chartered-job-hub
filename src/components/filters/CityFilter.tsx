import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const CityFilter = ({ value, onChange }: CityFilterProps) => {
  const [open, setOpen] = useState(false);
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-12 justify-start bg-white border-gray-200"
        >
          <MapPin className="mr-2 h-4 w-4 text-gray-500 shrink-0" />
          <span className="truncate">
            {value ? value : loading ? "Loading cities..." : "City"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search cities..." />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {cities.map((city) => (
              <CommandItem
                key={city}
                value={city}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "flex items-center",
                    value === city ? "font-medium" : ""
                  )}
                >
                  {city}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};