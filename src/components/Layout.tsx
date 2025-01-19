import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};