import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JobCardHeaderProps {
  title: string;
  createdAt?: string;
  postedDate?: string;
  saved: boolean;
  onSave: () => void;
}

export const JobCardHeader = ({
  title,
  createdAt,
  postedDate,
  saved,
  onSave,
}: JobCardHeaderProps) => {
  const timeAgo = (() => {
    try {
      if (postedDate) {
        return formatDistanceToNow(new Date(postedDate), { addSuffix: true });
      }
      if (createdAt) {
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
      }
      return "Recently posted";
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Recently posted";
    }
  })();

  return (
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{timeAgo}</span>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={onSave}
        className={`${
          saved 
            ? "bg-primary/10 text-primary border-primary hover:bg-primary/20" 
            : "border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        } ml-2 flex-shrink-0`}
      >
        {saved ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
      </Button>
    </div>
  );
};