import express from "express";
import { IStorage } from "./storage.js";
import { AIService } from "./ai.js";
import { insertResumeSchema, aiGenerationSchema } from "../shared/schema.js";

export function createRoutes(storage: IStorage) {
  const router = express.Router();
  const aiService = new AIService();

  // Resume routes
  router.get("/api/resumes", async (req, res) => {
    try {
      const resumes = await storage.getAllResumes();
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resumes" });
    }
  });

  router.get("/api/resumes/:id", async (req, res) => {
    try {
      const resume = await storage.getResume(req.params.id);
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }
      res.json(resume);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resume" });
    }
  });

  router.post("/api/resumes", async (req: express.Request, res: express.Response) => {
    try {
      const validatedData = insertResumeSchema.parse(req.body);
      const resume = await storage.createResume(validatedData);
      res.status(201).json(resume);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid resume data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create resume" });
    }
  });

  router.patch("/api/resumes/:id", async (req: express.Request, res: express.Response) => {
    try {
      const partialData = insertResumeSchema.partial().parse(req.body);
      const resume = await storage.updateResume(req.params.id, partialData);
      res.json(resume);
    } catch (error: any) {
      if (error.message === "Resume not found") {
        return res.status(404).json({ error: "Resume not found" });
      }
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid resume data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update resume" });
    }
  });

  router.delete("/api/resumes/:id", async (req: express.Request, res: express.Response) => {
    try {
      await storage.deleteResume(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete resume" });
    }
  });

  // Template routes
  router.get("/api/templates", async (req: express.Request, res: express.Response) => {
    try {
      const templates = await storage.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  router.get("/api/templates/:id", async (req: express.Request, res: express.Response) => {
    try {
      const template = await storage.getTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch template" });
    }
  });

  // AI generation routes
  router.post("/api/ai/generate", async (req: express.Request, res: express.Response) => {
    try {
      const validatedData = aiGenerationSchema.parse(req.body);
      const content = await aiService.generateContent(validatedData);
      res.json({ content });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid generation request", details: error.errors });
      }
      res.status(500).json({ error: error.message || "Failed to generate content" });
    }
  });

  router.post("/api/ai/improve", async (req: express.Request, res: express.Response) => {
    try {
      const { content, context } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      const improvedContent = await aiService.improveContent(content, context);
      res.json({ content: improvedContent });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to improve content" });
    }
  });

  return router;
}