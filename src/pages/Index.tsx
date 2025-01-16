import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { CareerActions } from "@/components/CareerActions";

const MOCK_JOBS = [
  {
    title: "Senior Chartered Accountant",
    company: "PwC",
    location: "London",
    salary: "£65,000 - £80,000",
    description: "Join our team of experienced chartered accountants working with FTSE 100 clients. Strong background in financial reporting and analysis required.",
    applyUrl: "#",
  },
  {
    title: "Financial Controller",
    company: "Deloitte",
    location: "Manchester",
    salary: "£55,000 - £70,000",
    description: "Looking for a qualified chartered accountant to join our growing financial services team. Experience with IFRS essential.",
    applyUrl: "#",
  },
  {
    title: "Tax Manager",
    company: "KPMG",
    location: "Birmingham",
    salary: "£50,000 - £65,000",
    description: "Exciting opportunity for a chartered accountant specializing in corporate tax planning and compliance.",
    applyUrl: "#",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold text-gray-900">CA Job Board</h1>
          <p className="text-gray-600 mt-2">Find your next role as a Chartered Accountant</p>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <FilterBar />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {MOCK_JOBS.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <CareerActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
