import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t mt-auto">
      <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-lg font-semibold text-gray-900">
            CharteredJobs
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a 
              href="https://www.charteredjobs.ie/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Newsletter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};