import OpenAI from "openai";
import { AIGenerationRequest } from "../shared/schema.js";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class AIService {
  async generateContent(request: AIGenerationRequest): Promise<string> {
    try {
      let prompt = "";

      switch (request.type) {
        case "summary":
          prompt = `Write a professional resume summary for a ${request.jobTitle || "professional"} in the ${request.industry || "industry"} industry. 
          ${request.experience ? `Experience level: ${request.experience}` : ""}
          ${request.currentContent ? `Current summary to improve: ${request.currentContent}` : ""}
          
          Write a compelling 2-3 sentence summary that highlights key strengths and career objectives. Be specific and impactful.`;
          break;

        case "experience":
          prompt = `Improve this work experience description for a resume:
          ${request.currentContent || ""}
          
          Job Title: ${request.jobTitle || ""}
          Industry: ${request.industry || ""}
          
          Rewrite this to be more impactful using action verbs, quantifiable achievements, and relevant keywords. Format as bullet points. Focus on results and impact.`;
          break;

        case "skills":
          prompt = `Generate a comprehensive skills list for a ${request.jobTitle || "professional"} position in ${request.industry || "the industry"}.
          ${request.experience ? `Experience level: ${request.experience}` : ""}
          
          Organize skills into categories (Technical Skills, Soft Skills, Tools & Technologies, etc.). 
          Return as a JSON object with categories as keys and arrays of skills as values.
          
          Example format:
          {
            "Technical Skills": ["Skill 1", "Skill 2"],
            "Soft Skills": ["Leadership", "Communication"],
            "Tools & Technologies": ["Tool 1", "Tool 2"]
          }`;
          break;

        case "complete":
          prompt = `Create a complete professional resume content for a ${request.jobTitle || "professional"} position.
          Industry: ${request.industry || "General"}
          Experience Level: ${request.experience || "Mid-level"}
          
          Generate realistic but professional content including:
          1. Professional summary (2-3 sentences)
          2. 2-3 work experiences with bullet points showing achievements
          3. Education background
          4. Skills organized by category
          5. 1-2 relevant projects
          
          Make it industry-specific and achievement-focused. Use action verbs and quantifiable results where possible.
          Return as JSON with the following structure:
          {
            "summary": "Professional summary text",
            "experience": [
              {
                "company": "Company Name",
                "position": "Job Title",
                "startDate": "YYYY-MM",
                "endDate": "YYYY-MM",
                "location": "City, State",
                "description": "• Achievement 1\\n• Achievement 2\\n• Achievement 3"
              }
            ],
            "education": [
              {
                "institution": "University Name",
                "degree": "Bachelor's/Master's",
                "field": "Field of Study",
                "startDate": "YYYY-MM",
                "endDate": "YYYY-MM"
              }
            ],
            "skills": {
              "Technical Skills": ["Skill 1", "Skill 2"],
              "Soft Skills": ["Skill 1", "Skill 2"]
            },
            "projects": [
              {
                "name": "Project Name",
                "description": "Project description with impact",
                "technologies": ["Tech 1", "Tech 2"]
              }
            ]
          }`;
          break;

        default:
          throw new Error("Invalid generation type");
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional resume writer and career coach. Generate high-quality, ATS-friendly resume content that highlights achievements and uses strong action verbs. Always be professional and specific."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: request.type === "skills" || request.type === "complete" ? { type: "json_object" } : undefined,
        temperature: 0.7,
        max_tokens: 1500
      });

      return response.choices[0].message.content || "";
    } catch (error) {
      console.error("AI generation error:", error);
      throw new Error("Failed to generate content. Please try again.");
    }
  }

  async improveContent(content: string, context: string = ""): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional resume editor. Improve the given content by making it more impactful, professional, and ATS-friendly. Use strong action verbs and focus on achievements."
          },
          {
            role: "user",
            content: `Improve this resume content: ${content}
            ${context ? `Context: ${context}` : ""}`
          }
        ],
        temperature: 0.5,
        max_tokens: 800
      });

      return response.choices[0].message.content || content;
    } catch (error) {
      console.error("Content improvement error:", error);
      throw new Error("Failed to improve content. Please try again.");
    }
  }
}