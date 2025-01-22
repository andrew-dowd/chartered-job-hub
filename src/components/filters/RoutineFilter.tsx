import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoutineFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const RoutineFilter = ({ value, onChange }: RoutineFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-12 w-full">
        <SelectValue placeholder="Routine" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All routines</SelectItem>
        <SelectItem value="remote">Remote</SelectItem>
        <SelectItem value="hybrid">Hybrid</SelectItem>
        <SelectItem value="office">Office</SelectItem>
      </SelectContent>
    </Select>
  );
};