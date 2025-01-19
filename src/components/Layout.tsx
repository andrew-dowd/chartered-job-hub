import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { NewsletterSubscription } from "./NewsletterSubscription";

export const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="w-full max-w-[2000px] mx-auto px-4 md:px-8 lg:px-12 pt-8 md:pt-12 pb-16 md:pb-24">
        <Outlet />
      </main>
      {!isAuthPage && <NewsletterSubscription />}
    </div>
  );
};