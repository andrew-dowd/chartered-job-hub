import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { UserCircle2, LogIn, UserPlus, BookmarkIcon, BriefcaseIcon, Users, Mail, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log("Auth state changed:", _event, newSession?.user?.email);
      setSession(newSession);
      
      // If user signs out, redirect to auth page
      if (_event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      toast({
        title: "Error signing out",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleSubscribe = () => {
    window.open("https://www.charteredjobs.ie/", "_blank", "noopener,noreferrer");
  };

  const handleJoinCommunity = () => {
    window.open("https://www.reddit.com/r/AccountantsEire/", "_blank", "noopener,noreferrer");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle2 className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border shadow-lg">
        {session ? (
          // Logged in state
          <>
            <DropdownMenuItem onClick={() => navigate("/saved-jobs")} className="cursor-pointer">
              <BookmarkIcon className="mr-2 h-4 w-4" />
              Saved Jobs
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/post-job")} className="cursor-pointer">
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              Post a Job
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/talent-network")} className="cursor-pointer">
              <Users className="mr-2 h-4 w-4" />
              Talent Network
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
              <LogIn className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          // Logged out state
          <>
            <DropdownMenuItem onClick={() => navigate("/auth")} className="cursor-pointer">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/auth")} className="cursor-pointer">
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};