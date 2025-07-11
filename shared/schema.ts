import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

// Resume data structure
export const resumeSchema = z.object({
  id: z.string(),
  title: z.string(),
  templateId: z.string(),
  personalInfo: z.object({
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    location: z.string(),
    website: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    summary: z.string().optional(),
  }),
  experience: z.array(z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean(),
    location: z.string(),
    description: z.string(),
  })),
  education: z.array(z.object({
    id: z.string(),
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean(),
    gpa: z.string().optional(),
  })),
  skills: z.array(z.object({
    id: z.string(),
    category: z.string(),
    items: z.array(z.string()),
  })),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    url: z.string().optional(),
    github: z.string().optional(),
  })),
  certifications: z.array(z.object({
    id: z.string(),
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
    url: z.string().optional(),
  })),
  languages: z.array(z.object({
    id: z.string(),
    language: z.string(),
    proficiency: z.enum(["Basic", "Conversational", "Fluent", "Native"]),
  })),
});

export const insertResumeSchema = resumeSchema.omit({ id: true });
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = z.infer<typeof resumeSchema>;

// Template structure
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  preview: z.string(),
  isPremium: z.boolean(),
});

export const insertTemplateSchema = templateSchema.omit({ id: true });
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = z.infer<typeof templateSchema>;

// AI generation request
export const aiGenerationSchema = z.object({
  type: z.enum(["summary", "experience", "skills", "complete"]),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  experience: z.string().optional(),
  currentContent: z.string().optional(),
  context: z.record(z.any()).optional(),
});

export type AIGenerationRequest = z.infer<typeof aiGenerationSchema>;