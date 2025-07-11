const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// In-memory storage
const resumes = new Map();
const templates = new Map();

// Initialize default templates
const defaultTemplates = [
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
];

defaultTemplates.forEach(template => {
  templates.set(template.id, template);
});

// AI Service simulation
async function generateAIContent(type, context = {}) {
  // Simulate AI generation with realistic content
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  switch (type) {
    case 'summary':
      return `Dynamic ${context.jobTitle || 'professional'} with proven expertise in ${context.industry || 'various industries'}. Passionate about delivering high-quality results and driving innovation through collaborative teamwork and strategic thinking.`;
    
    case 'experience':
      return `• Led cross-functional teams to achieve 25% improvement in project delivery times
• Implemented innovative solutions that reduced operational costs by 15%
• Collaborated with stakeholders to define requirements and deliver exceptional results
• Mentored junior team members and fostered a culture of continuous learning`;
    
    case 'skills':
      return JSON.stringify({
        "Technical Skills": ["JavaScript", "Python", "React", "Node.js"],
        "Soft Skills": ["Leadership", "Communication", "Problem Solving", "Team Collaboration"],
        "Tools & Technologies": ["Git", "Docker", "AWS", "MongoDB"]
      });
    
    default:
      return "AI-generated content based on your input.";
  }
}

// Routes

// Resume routes
app.get('/api/resumes', (req, res) => {
  try {
    const allResumes = Array.from(resumes.values());
    res.json(allResumes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

app.get('/api/resumes/:id', (req, res) => {
  try {
    const resume = resumes.get(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resume" });
  }
});

app.post('/api/resumes', (req, res) => {
  try {
    const id = Math.random().toString(36).substring(2, 15);
    const newResume = { ...req.body, id };
    resumes.set(id, newResume);
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ error: "Failed to create resume" });
  }
});

app.patch('/api/resumes/:id', (req, res) => {
  try {
    const existing = resumes.get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Resume not found" });
    }
    const updated = { ...existing, ...req.body };
    resumes.set(req.params.id, updated);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update resume" });
  }
});

app.delete('/api/resumes/:id', (req, res) => {
  try {
    resumes.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete resume" });
  }
});

// Template routes
app.get('/api/templates', (req, res) => {
  try {
    const allTemplates = Array.from(templates.values());
    res.json(allTemplates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
});

app.get('/api/templates/:id', (req, res) => {
  try {
    const template = templates.get(req.params.id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch template" });
  }
});

// AI generation routes
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { type, jobTitle, industry, experience, currentContent } = req.body;
    const content = await generateAIContent(type, {
      jobTitle,
      industry,
      experience,
      currentContent
    });
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to generate content" });
  }
});

app.post('/api/ai/improve', async (req, res) => {
  try {
    const { content, context } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }
    // Simulate content improvement
    const improvedContent = `Enhanced: ${content}`;
    res.json({ content: improvedContent });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to improve content" });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Resume Builder API running on http://0.0.0.0:${port}`);
  console.log(`Health check: http://0.0.0.0:${port}/health`);
});

module.exports = app;