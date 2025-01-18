import { useNavigate } from "react-router-dom";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { LogIn, UserPlus, Mail, Users, HelpCircle, FileEdit } from "lucide-react";

export const UnauthenticatedMenuItems = () => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    window.open("https://www.charteredjobs.ie/", "_blank", "noopener,noreferrer");
  };

  const handleJoinCommunity = () => {
    window.open("https://www.reddit.com/r/AccountantsEire/", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <DropdownMenuItem onClick={() => navigate("/auth?mode=signin")} className="cursor-pointer">
        <LogIn className="mr-2 h-4 w-4" />
        Log In
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/auth?mode=signup")} className="cursor-pointer">
        <UserPlus className="mr-2 h-4 w-4" />
        Sign Up
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => navigate("/post-job")} className="cursor-pointer">
        <FileEdit className="mr-2 h-4 w-4" />
        Post a Job
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleSubscribe} className="cursor-pointer">
        <Mail className="mr-2 h-4 w-4" />
        Subscribe
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleJoinCommunity} className="cursor-pointer">
        <Users className="mr-2 h-4 w-4" />
        Join Community
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/faq")} className="cursor-pointer">
        <HelpCircle className="mr-2 h-4 w-4" />
        FAQ
      </DropdownMenuItem>
    </>
  );
};