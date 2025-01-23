export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range?: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
  reasoning?: string;
  job_url: string;
  posted_date?: string;
  min_experience?: number | null;
  location_category?: string;
  routine?: string | null;
  responsibilities?: string;
  perks?: string;
  industry?: string;
  employment_type?: string;
  qualification?: string;
  other_key_experience?: string;
}