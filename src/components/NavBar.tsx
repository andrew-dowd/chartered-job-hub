import { Link, useNavigate } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">Chartered Jobs</h1>
          <p className="text-sm text-gray-600">Find your next role as a Chartered Accountant in Ireland</p>
        </Link>
        <div className="flex items-center gap-3">
          <Button 
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
            onClick={() => navigate('/talent-network')}
          >
            <Upload className="h-4 w-4" />
            Join Talent Network
          </Button>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};