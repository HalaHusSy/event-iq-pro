import { z } from 'zod';

export const IndustryEnum = z.enum([
  'Finance', 'Banking', 'Insurance',
  'Healthcare', 'Pharmaceutical',
  'Manufacturing', 'Automotive',
  'Retail', 'E-commerce', 'F&B',
  'Education', 'Government',
  'Logistics', 'Real Estate',
  'Energy', 'Agriculture',
  'Media & Entertainment', 'Telecom',
  'AI/SaaS', 'Cybersecurity', 'Other',
]);

export const SolutionCategoryEnum = z.enum([
  'Conversational AI', 'Voice AI', 'Document AI / RAG', 'Computer Vision',
  'Predictive Analytics', 'BI / Dashboard', 'Data Platform',
  'Cloud Infrastructure', 'DevOps', 'Cybersecurity',
  'Payment', 'Marketing Automation', 'CRM', 'HR Tech',
  'IoT / Edge', 'Robotics', 'Blockchain',
  'LMS / EdTech', 'PropTech', 'Other',
]);

export const CompanySizeEnum = z.enum(['Startup', 'SME', 'Mid-Market', 'Enterprise', 'Government']);

export const EmployeeCountEnum = z.enum(['1-10', '11-50', '51-200', '201-500', '500+']);

export const DeploymentOptionEnum = z.enum(['cloud', 'on-prem', 'hybrid', 'edge']);

export const PricingTierEnum = z.enum(['startup', 'mid-market', 'enterprise']);

export const PricingModelEnum = z.enum(['subscription', 'usage', 'license', 'project']);

export const UseCaseSchema = z.object({
  title: z.string().min(1),
  industry: IndustryEnum,
  problem_th: z.string().min(1),
  problem_en: z.string().min(1),
  solution_summary: z.string().min(1),
  outcome_metric: z.string().min(1),
  customer_anonymized: z.string().min(1),
});

export const ExhibitorSchema = z.object({
  id: z.string().regex(/^ex\d{2}$/, 'id must match exNN format'),
  name: z.string().min(1),
  logo_url: z.string().min(1),
  booth_no: z.string().regex(/^[A-Z]-\d{2}$/, 'booth_no must match X-NN format'),
  hall: z.string().min(1),

  industry: IndustryEnum,
  sub_industries: z.array(z.string()).min(1).max(5),
  solution_categories: z.array(SolutionCategoryEnum).min(1).max(5),

  tagline_th: z.string().min(1).max(120),
  tagline_en: z.string().min(1).max(120),
  description_th: z.string().min(1),
  description_en: z.string().min(1),
  long_pitch_en: z.string().min(50, 'long_pitch_en should be substantial (50+ chars) for good retrieval'),

  problem_statements_en: z.array(z.string()).min(2).max(8),
  unique_value_props: z.array(z.string()).min(2).max(5),

  target_company_sizes: z.array(CompanySizeEnum).min(1),
  target_industries: z.array(IndustryEnum).min(1),
  target_roles: z.array(z.string()).default([]),
  geographic_focus: z.array(z.string()).default([]),

  tech_stack: z.array(z.string()).default([]),
  integrations: z.array(z.string()).default([]),
  deployment_options: z.array(DeploymentOptionEnum).min(1),

  pricing_tier: PricingTierEnum,
  pricing_model: PricingModelEnum,
  pricing_starts_at_thb: z.number().int().nonnegative(),
  pricing_note_th: z.string().default(''),
  pricing_note_en: z.string().default(''),

  founded_year: z.number().int().min(1900).max(2030),
  employee_count: EmployeeCountEnum,
  headquarters: z.string().min(1),

  notable_clients: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  awards: z.array(z.string()).default([]),

  demo_video_url: z.string().url().optional().or(z.literal('')),
  case_study_urls: z.array(z.string()).default([]),
  brochure_url: z.string().url().optional().or(z.literal('')),

  booth_activities_th: z.array(z.string()).default([]),
  booth_activities_en: z.array(z.string()).default([]),

  website: z.string().url(),
  contact_email: z.string().email(),
  contact_phone: z.string().default(''),
  contact_line_id: z.string().default(''),

  use_cases: z.array(UseCaseSchema).min(1).max(5),

  embedding_text: z.string().optional(),
  embedding: z.array(z.number()).optional(),
});

export type Exhibitor = z.infer<typeof ExhibitorSchema>;
export type Industry = z.infer<typeof IndustryEnum>;
export type SolutionCategory = z.infer<typeof SolutionCategoryEnum>;
export type CompanySize = z.infer<typeof CompanySizeEnum>;
export type EmployeeCount = z.infer<typeof EmployeeCountEnum>;
export type DeploymentOption = z.infer<typeof DeploymentOptionEnum>;
export type PricingTier = z.infer<typeof PricingTierEnum>;
export type PricingModel = z.infer<typeof PricingModelEnum>;
export type UseCase = z.infer<typeof UseCaseSchema>;

export function buildEmbeddingText(e: Exhibitor): string {
  return [
    e.name,
    e.tagline_en,
    e.long_pitch_en,
    `Industry: ${e.industry}. Sub: ${e.sub_industries.join(', ')}.`,
    `Categories: ${e.solution_categories.join(', ')}.`,
    `Problems solved: ${e.problem_statements_en.join(' ')}`,
    `Use cases: ${e.use_cases.map((u) => `${u.problem_en} -> ${u.outcome_metric}`).join('. ')}`,
    `Tech: ${e.tech_stack.join(', ')}. Integrations: ${e.integrations.join(', ')}.`,
    `Target: ${e.target_company_sizes.join('/')} in ${e.target_industries.join('/')}.`,
  ].join('\n');
}
