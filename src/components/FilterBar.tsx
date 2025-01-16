import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FilterBar = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow-sm rounded-lg">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Salary Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-30k">£0 - £30,000</SelectItem>
          <SelectItem value="30-50k">£30,000 - £50,000</SelectItem>
          <SelectItem value="50-80k">£50,000 - £80,000</SelectItem>
          <SelectItem value="80k+">£80,000+</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Experience Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="entry">Entry Level</SelectItem>
          <SelectItem value="mid">Mid Level</SelectItem>
          <SelectItem value="senior">Senior Level</SelectItem>
          <SelectItem value="director">Director Level</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="london">London</SelectItem>
          <SelectItem value="manchester">Manchester</SelectItem>
          <SelectItem value="birmingham">Birmingham</SelectItem>
          <SelectItem value="remote">Remote</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline">Clear Filters</Button>
    </div>
  );
};