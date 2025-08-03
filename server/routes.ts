import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertQuizResponseSchema, insertStackAuditRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Lead capture endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      
      // Check if lead already exists
      const existingLead = await storage.getLeadByEmail(leadData.email);
      if (existingLead) {
        return res.json({ success: true, lead: existingLead, message: "Already subscribed" });
      }
      
      const lead = await storage.createLead(leadData);
      res.json({ success: true, lead });
    } catch (error) {
      res.status(400).json({ error: error instanceof z.ZodError ? error.errors : "Invalid data" });
    }
  });

  // Quiz questions endpoint
  app.get("/api/quiz/questions", async (req, res) => {
    try {
      const questions = await storage.getQuizQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz questions" });
    }
  });

  // Submit quiz response
  app.post("/api/quiz/responses", async (req, res) => {
    try {
      const responseData = insertQuizResponseSchema.parse(req.body);
      const response = await storage.saveQuizResponse(responseData);
      res.json({ success: true, response });
    } catch (error) {
      res.status(400).json({ error: error instanceof z.ZodError ? error.errors : "Invalid data" });
    }
  });

  // Get quiz results and recommendations
  app.get("/api/quiz/results/:leadId", async (req, res) => {
    try {
      const { leadId } = req.params;
      const responses = await storage.getQuizResponsesByLead(leadId);
      
      // Generate personalized recommendations based on responses
      const recommendations = generateRecommendations(responses);
      
      res.json({ responses, recommendations });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz results" });
    }
  });

  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      const products = await storage.getProducts(category as string);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  // Blog endpoints
  app.get("/api/blog", async (req, res) => {
    try {
      const { category } = req.query;
      const posts = await storage.getBlogPosts(category as string);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/featured", async (req, res) => {
    try {
      const post = await storage.getFeaturedBlogPost();
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured blog post" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPost(slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Stack audit request
  app.post("/api/stack-audit", async (req, res) => {
    try {
      const requestData = insertStackAuditRequestSchema.parse(req.body);
      const auditRequest = await storage.createStackAuditRequest(requestData);
      res.json({ success: true, request: auditRequest });
    } catch (error) {
      res.status(400).json({ error: error instanceof z.ZodError ? error.errors : "Invalid data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateRecommendations(responses: any[]) {
  // Simple recommendation logic based on quiz responses
  const recommendations = {
    stackType: "hormone-balance",
    title: "Your Hormone Balance Stack",
    supplements: [
      {
        name: "Vitex (Chasteberry)",
        dosage: "400mg daily",
        purpose: "supports hormone regulation",
        priority: "Priority"
      },
      {
        name: "Vitamin D3",
        dosage: "2000 IU daily",
        purpose: "hormone synthesis support",
        priority: "Essential"
      }
    ]
  };

  // In a real implementation, this would analyze the responses and generate
  // personalized recommendations based on the user's specific answers
  
  return recommendations;
}
