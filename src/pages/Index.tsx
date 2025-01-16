import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { CareerActions } from "@/components/CareerActions";

const MOCK_JOBS = [
  {
    title: "Senior Financial Accountant",
    company: "KPMG",
    location: "Dublin",
    salary: "€65,000 - €85,000",
    description: "Join our team of experienced chartered accountants working with leading Irish and multinational clients. Strong background in financial reporting and analysis required.",
    applyUrl: "#",
  },
  {
    title: "Tax Manager",
    company: "PwC",
    location: "Cork",
    salary: "€60,000 - €75,000",
    description: "Exciting opportunity for a chartered accountant specializing in corporate tax planning and compliance for Irish businesses.",
    applyUrl: "#",
  },
  {
    title: "Audit Senior",
    company: "Deloitte",
    location: "Galway",
    salary: "€45,000 - €60,000",
    description: "Join our audit team working with diverse clients across Ireland. Excellent opportunity for career progression.",
    applyUrl: "#",
  },
  {
    title: "Financial Controller",
    company: "EY",
    location: "Limerick",
    salary: "€70,000 - €90,000",
    description: "Leading the financial operations for our growing Irish client base. Strong commercial acumen required.",
    applyUrl: "#",
  },
  {
    title: "Management Accountant",
    company: "Grant Thornton",
    location: "Waterford",
    salary: "€45,000 - €60,000",
    description: "Supporting Irish businesses with management reporting and financial analysis.",
    applyUrl: "#",
  },
  {
    title: "Corporate Finance Associate",
    company: "BDO",
    location: "Dublin",
    salary: "€50,000 - €65,000",
    description: "Working on M&A transactions and corporate advisory projects across Ireland.",
    applyUrl: "#",
  },
  {
    title: "Risk Advisory Manager",
    company: "KPMG",
    location: "Belfast",
    salary: "€55,000 - €75,000",
    description: "Leading risk advisory projects for major Irish and international clients.",
    applyUrl: "#",
  },
  {
    title: "Internal Auditor",
    company: "AIB",
    location: "Dublin",
    salary: "€45,000 - €60,000",
    description: "Supporting internal audit function for one of Ireland's leading banks.",
    applyUrl: "#",
  },
  {
    title: "Group Accountant",
    company: "CRH",
    location: "Dublin",
    salary: "€55,000 - €70,000",
    description: "Managing group consolidation and reporting for Irish operations.",
    applyUrl: "#",
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">CA Job Board</h1>
          <p className="text-gray-600 mt-2">Find your next role as a Chartered Accountant in Ireland</p>
        </div>
      </header>

      <main className="container mx-auto py-8 space-y-8">
        <CareerActions />
        
        <div className="space-y-8">
          <FilterBar />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_JOBS.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;