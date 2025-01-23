export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  salary_range?: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
  reasoning?: string;
  job_url: string;
  applyUrl?: string;
  posted_date?: string;
  postedDate?: string;
  min_experience?: number | null;
  minExperience?: number | null;
  location_category?: string;
  locationCategory?: string;
  routine?: string | null;
  responsibilities?: string;
  perks?: string;
  industry?: string;
  employment_type?: string;
  employmentType?: string;
  qualification?: string;
  other_key_experience?: string;
}