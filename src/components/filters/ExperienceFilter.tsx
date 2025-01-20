import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";

interface ExperienceFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const ExperienceFilter = ({ value, onChange }: ExperienceFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] h-12 bg-white border-gray-200">
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-gray-500" />
          <SelectValue placeholder="Experience" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-lg">
        <SelectItem value="0-2 years" className="hover:bg-gray-50">0-2 years</SelectItem>
        <SelectItem value="3-5 years" className="hover:bg-gray-50">3-5 years</SelectItem>
        <SelectItem value="5+ years" className="hover:bg-gray-50">5+ years</SelectItem>
      </SelectContent>
    </Select>
  );
};