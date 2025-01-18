import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { subHours, subDays } from "date-fns";
import { ProfileDropdown } from "@/components/ProfileDropdown";

const MOCK_JOBS = [
  {
    title: "Senior Financial Accountant",
    company: "KPMG",
    location: "Dublin",
    salary: "€65,000 - €85,000",
    description: "Join our team of experienced chartered accountants working with leading Irish and multinational clients. Strong background in financial reporting and analysis required.",
    applyUrl: "#",
    createdAt: subHours(new Date(), 2).toISOString(),
    experience_level: "5+"
  },
  {
    title: "Tax Manager",
    company: "PwC",
    location: "Cork",
    salary: "€60,000 - €75,000",
    description: "Exciting opportunity for a chartered accountant specializing in corporate tax planning and compliance for Irish businesses.",
    applyUrl: "#",
    createdAt: subHours(new Date(), 5).toISOString(),
    experience_level: "3-5"
  },
  {
    title: "Audit Senior",
    company: "Deloitte",
    location: "Galway",
    salary: "€45,000 - €60,000",
    description: "Join our audit team working with diverse clients across Ireland. Excellent opportunity for career progression.",
    applyUrl: "#",
    createdAt: subDays(new Date(), 1).toISOString(),
    experience_level: "3-5"
  },
  {
    title: "Financial Controller",
    company: "EY",
    location: "Limerick",
    salary: "€70,000 - €90,000",
    description: "Leading the financial operations for our growing Irish client base. Strong commercial acumen required.",
    applyUrl: "#",
    experience_level: "5+"
  },
  {
    title: "Management Accountant",
    company: "Grant Thornton",
    location: "Waterford",
    salary: "€45,000 - €60,000",
    description: "Supporting Irish businesses with management reporting and financial analysis.",
    applyUrl: "#",
    experience_level: "0-2"
  },
  {
    title: "Corporate Finance Associate",
    company: "BDO",
    location: "Dublin",
    salary: "€50,000 - €65,000",
    description: "Working on M&A transactions and corporate advisory projects across Ireland.",
    applyUrl: "#",
    experience_level: "3-5"
  },
  {
    title: "Risk Advisory Manager",
    company: "KPMG",
    location: "Belfast",
    salary: "€55,000 - €75,000",
    description: "Leading risk advisory projects for major Irish and international clients.",
    applyUrl: "#",
    experience_level: "5+"
  },
  {
    title: "Internal Auditor",
    company: "AIB",
    location: "Dublin",
    salary: "€45,000 - €60,000",
    description: "Supporting internal audit function for one of Ireland's leading banks.",
    applyUrl: "#",
    experience_level: "0-2"
  },
  {
    title: "Group Accountant",
    company: "CRH",
    location: "Dublin",
    salary: "€55,000 - €70,000",
    description: "Managing group consolidation and reporting for Irish operations.",
    applyUrl: "#",
    experience_level: "3-5"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [salaryRange, setSalaryRange] = useState([30, 200]);
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      // Search filter
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Salary filter
      const salaryMatch = (() => {
        // Extract numbers from salary string (e.g., "€45,000 - €60,000")
        const numbers = job.salary.match(/\d+,?\d*/g)?.map(num => parseInt(num.replace(',', ''), 10)) || [];
        if (numbers.length >= 2) {
          const [jobMinSalary, jobMaxSalary] = numbers;
          // Convert to thousands (k) to match the slider values
          const jobMinK = Math.floor(jobMinSalary / 1000);
          const jobMaxK = Math.floor(jobMaxSalary / 1000);
          return jobMinK >= salaryRange[0] && jobMaxK <= salaryRange[1];
        }
        return false;
      })();

      // Location filter
      const locationMatch = !location || job.location.toLowerCase() === location;

      // Experience filter
      const experienceMatch = !experience || job.experience_level === experience;

      return matchesSearch && salaryMatch && locationMatch && experienceMatch;
    });
  }, [searchQuery, salaryRange, experience, location]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSalaryRange([30, 200]);
    setExperience("");
    setLocation("");
  };

  const handleTalentNetwork = () => {
    navigate('/talent-network');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chartered Jobs</h1>
            <p className="text-sm text-gray-600">Find your next role as a Chartered Accountant in Ireland</p>
          </div>
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

      <main className="container mx-auto px-4 py-8 space-y-8">
        <FilterBar
          onSearchChange={setSearchQuery}
          onSalaryChange={setSalaryRange}
          onExperienceChange={setExperience}
          onLocationChange={setLocation}
          onClearFilters={handleClearFilters}
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No jobs found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
