import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";

interface RoutineFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const RoutineFilter = ({ value, onChange }: RoutineFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-12 w-full bg-white border-gray-200">
        <div className="flex items-center">
          <Building2 className="mr-2 h-4 w-4 text-gray-500 shrink-0" />
          <SelectValue placeholder="Work Location" className="text-left" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="remote">Remote</SelectItem>
        <SelectItem value="hybrid">Hybrid</SelectItem>
        <SelectItem value="office">Office</SelectItem>
      </SelectContent>
    </Select>
  );
};