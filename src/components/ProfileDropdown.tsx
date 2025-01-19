import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthenticatedMenuItems } from "./dropdown/AuthenticatedMenuItems";
import { UnauthenticatedMenuItems } from "./dropdown/UnauthenticatedMenuItems";

export const ProfileDropdown = () => {
  const navigate = useNavigate();
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          <UserCircle2 className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border shadow-lg">
        {session ? <AuthenticatedMenuItems /> : <UnauthenticatedMenuItems />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};