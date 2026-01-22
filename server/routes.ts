
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data if empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "E-Commerce Dashboard",
      description: "A comprehensive dashboard for managing online stores, featuring real-time analytics and inventory management.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      projectUrl: "#",
      tags: ["React", "TypeScript", "Tailwind CSS", "Recharts"]
    });
    
    await storage.createProject({
      title: "AI Chat Assistant",
      description: "Intelligent conversational agent powered by OpenAI, supporting context-aware responses and code generation.",
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      projectUrl: "#",
      tags: ["OpenAI API", "Node.js", "WebSocket", "Redis"]
    });

    await storage.createProject({
      title: "Creative Portfolio",
      description: "Minimalist portfolio website focusing on typography and smooth interactions to showcase creative work.",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      projectUrl: "#",
      tags: ["Framer Motion", "React", "Design System"]
    });
  }

  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    const skills = [
      { name: "React", category: "Frontend", proficiency: 90 },
      { name: "TypeScript", category: "Frontend", proficiency: 85 },
      { name: "Tailwind CSS", category: "Frontend", proficiency: 95 },
      { name: "Node.js", category: "Backend", proficiency: 80 },
      { name: "PostgreSQL", category: "Backend", proficiency: 75 },
      { name: "Drizzle ORM", category: "Backend", proficiency: 80 },
      { name: "Git", category: "Tools", proficiency: 85 },
      { name: "Figma", category: "Tools", proficiency: 70 },
    ];

    for (const skill of skills) {
      await storage.createSkill(skill);
    }
  }
}
