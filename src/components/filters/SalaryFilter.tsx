import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EuroIcon } from "lucide-react";

interface SalaryFilterProps {
  minSalary: number;
  includeMissingSalary: boolean;
  onMinSalaryChange: (minSalary: number, includeMissingSalary: boolean) => void;
}

export const SalaryFilter = ({
  minSalary,
  includeMissingSalary,
  onMinSalaryChange,
}: SalaryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="h-12 border-gray-200 bg-white hover:bg-gray-50 px-4 justify-start font-normal w-[180px]"
        >
          <EuroIcon className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-gray-600">
            {minSalary === 30 && !includeMissingSalary 
              ? "Salary" 
              : `€${minSalary}k+${includeMissingSalary ? " (incl. unspecified)" : ""}`
            }
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-4 bg-white border border-gray-200 shadow-lg" 
        align="start"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Minimum Salary</h4>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 min-w-[48px]">€{minSalary}k</span>
              <Slider
                defaultValue={[30]}
                max={200}
                min={30}
                step={5}
                value={[minSalary]}
                onValueChange={(value) => onMinSalaryChange(value[0], includeMissingSalary)}
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-600 min-w-[48px] text-right">€200k</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeMissingSalary"
              checked={includeMissingSalary}
              onCheckedChange={(checked) => 
                onMinSalaryChange(minSalary, checked as boolean)
              }
            />
            <label
              htmlFor="includeMissingSalary"
              className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
            >
              Include jobs without salary
            </label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};