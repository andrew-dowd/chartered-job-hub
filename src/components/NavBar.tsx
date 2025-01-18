import { Link } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";

export const NavBar = () => {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">Chartered Jobs</h1>
          <p className="text-sm text-gray-600">Find your next role as a Chartered Accountant in Ireland</p>
        </Link>
        <div className="flex items-center gap-3">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};