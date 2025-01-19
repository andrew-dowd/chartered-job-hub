import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="w-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 pt-2 md:pt-4">
        <Outlet />
      </main>
    </div>
  );
};