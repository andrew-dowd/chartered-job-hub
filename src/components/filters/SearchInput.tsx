import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        placeholder={isMobile ? "Search jobs..." : "Search jobs by title, company, location or description..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 h-12 w-full rounded-lg border-gray-200 text-base"
      />
    </div>
  );
};