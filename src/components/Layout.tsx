import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="w-full px-4 py-8 md:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};