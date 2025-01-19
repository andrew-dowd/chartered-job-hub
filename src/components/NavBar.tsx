import { Link, useNavigate } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const NavBar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b">
      <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
          <Link to="/" className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Chartered Jobs</h1>
            <p className="text-xs md:text-sm text-gray-600">Find your next role as a Chartered Accountant in Ireland</p>
          </Link>
          <div className="flex items-center gap-3">
            <Button 
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm md:text-base w-full md:w-auto justify-center"
              onClick={() => navigate('/talent-network')}
            >
              <Upload className="h-4 w-4" />
              {isMobile ? "Join Network" : "Join Talent Network"}
            </Button>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};