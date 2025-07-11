import { Resume, InsertResume, Template, InsertTemplate } from "../shared/schema.js";

export interface IStorage {
  // Resume operations
  createResume(resume: InsertResume): Promise<Resume>;
  getResume(id: string): Promise<Resume | null>;
  getAllResumes(): Promise<Resume[]>;
  updateResume(id: string, resume: Partial<InsertResume>): Promise<Resume>;
  deleteResume(id: string): Promise<void>;

  // Template operations
  getAllTemplates(): Promise<Template[]>;
  getTemplate(id: string): Promise<Template | null>;
}

export class MemStorage implements IStorage {
  private resumes: Map<string, Resume> = new Map();
  private templates: Map<string, Template> = new Map();

  constructor() {
    this.initializeTemplates();
  }

  private initializeTemplates() {
    const defaultTemplates: Template[] = [
      {
        id: "modern-minimal",
        name: "Modern Minimal",
        description: "Clean and modern design with plenty of white space",
        category: "Modern",
        preview: "/templates/modern-minimal.svg",
        isPremium: false,
      },
      {
        id: "professional-classic",
        name: "Professional Classic",
        description: "Traditional professional layout perfect for corporate roles",
        category: "Professional",
        preview: "/templates/professional-classic.svg",
        isPremium: false,
      },
      {
        id: "creative-design",
        name: "Creative Design",
        description: "Eye-catching design for creative professionals",
        category: "Creative",
        preview: "/templates/creative-design.svg",
        isPremium: true,
      },
      {
        id: "tech-focused", 
        name: "Tech Focused",
        description: "Optimized layout for software developers and engineers",
        category: "Tech",
        preview: "/templates/tech-focused.svg",
        isPremium: false,
      },
      {
        id: "executive-premium",
        name: "Executive Premium",
        description: "Premium design for senior executives and leaders",
        category: "Executive",
        preview: "/templates/executive-premium.svg",
        isPremium: true,
      },
      {
        id: "academic-research",
        name: "Academic Research",
        description: "Perfect for researchers and academic positions",
        category: "Academic",
        preview: "/templates/academic-research.svg",
        isPremium: false,
      }
    ];

    defaultTemplates.forEach(template => {
      this.templates.set(template.id, template);
    });
  }

  async createResume(resume: InsertResume): Promise<Resume> {
    const id = Math.random().toString(36).substring(2, 15);
    const newResume: Resume = { ...resume, id };
    this.resumes.set(id, newResume);
    return newResume;
  }

  async getResume(id: string): Promise<Resume | null> {
    return this.resumes.get(id) || null;
  }

  async getAllResumes(): Promise<Resume[]> {
    return Array.from(this.resumes.values());
  }

  async updateResume(id: string, resume: Partial<InsertResume>): Promise<Resume> {
    const existing = this.resumes.get(id);
    if (!existing) {
      throw new Error("Resume not found");
    }
    const updated = { ...existing, ...resume };
    this.resumes.set(id, updated);
    return updated;
  }

  async deleteResume(id: string): Promise<void> {
    this.resumes.delete(id);
  }

  async getAllTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async getTemplate(id: string): Promise<Template | null> {
    return this.templates.get(id) || null;
  }
}