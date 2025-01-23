import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JobDialogHeaderProps {
  title: string;
  postedDate?: string;
}

export const JobDialogHeader = ({ title, postedDate }: JobDialogHeaderProps) => {
  const timeAgo = postedDate
    ? formatDistanceToNow(new Date(postedDate), { addSuffix: true })
    : "Recently posted";

  return (
    <div className="space-y-4">
      <div className="flex items-center text-gray-600 text-sm">
        <Clock className="w-4 h-4 mr-2" />
        <span>{timeAgo}</span>
      </div>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
};