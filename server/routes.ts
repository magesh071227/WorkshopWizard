import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertWorkshopSchema, 
  insertRegistrationSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Workshops endpoints
  app.get("/api/workshops", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const status = req.query.status as string | undefined;
      
      let workshops;
      if (category) {
        workshops = await storage.getWorkshopsByCategory(category);
      } else if (status) {
        workshops = await storage.getWorkshopsByStatus(status);
      } else {
        workshops = await storage.getAllWorkshops();
      }
      
      res.json(workshops);
    } catch (error) {
      res.status(500).json({ message: "Error fetching workshops" });
    }
  });

  app.get("/api/workshops/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid workshop ID" });
      }
      
      const workshop = await storage.getWorkshopById(id);
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      
      // Also fetch registration count for this workshop
      const registrationCount = await storage.getRegistrationCount(id);
      
      res.json({ ...workshop, registrationCount });
    } catch (error) {
      res.status(500).json({ message: "Error fetching workshop" });
    }
  });

  app.post("/api/workshops", async (req, res) => {
    try {
      const workshopData = insertWorkshopSchema.parse(req.body);
      const newWorkshop = await storage.createWorkshop(workshopData);
      res.status(201).json(newWorkshop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid workshop data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error creating workshop" });
    }
  });

  app.put("/api/workshops/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid workshop ID" });
      }
      
      // Partial validation for update
      const workshopData = insertWorkshopSchema.partial().parse(req.body);
      
      const updatedWorkshop = await storage.updateWorkshop(id, workshopData);
      if (!updatedWorkshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      
      res.json(updatedWorkshop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid workshop data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error updating workshop" });
    }
  });

  app.delete("/api/workshops/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid workshop ID" });
      }
      
      const success = await storage.deleteWorkshop(id);
      if (!success) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting workshop" });
    }
  });

  // Registrations endpoints
  app.post("/api/registrations", async (req, res) => {
    try {
      const registrationData = insertRegistrationSchema.parse(req.body);
      
      // Check if workshop exists
      const workshop = await storage.getWorkshopById(registrationData.workshopId);
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      
      // Check if workshop is at capacity
      const currentRegistrations = await storage.getRegistrationCount(registrationData.workshopId);
      if (currentRegistrations >= workshop.capacity) {
        return res.status(400).json({ message: "Workshop is at full capacity" });
      }
      
      const newRegistration = await storage.createRegistration(registrationData);
      res.status(201).json(newRegistration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid registration data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error creating registration" });
    }
  });

  app.get("/api/workshops/:id/registrations", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid workshop ID" });
      }
      
      // Verify workshop exists
      const workshop = await storage.getWorkshopById(id);
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      
      const registrations = await storage.getRegistrationsByWorkshopId(id);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching registrations" });
    }
  });

  app.get("/api/workshops/:id/registration-count", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid workshop ID" });
      }
      
      const registrationCount = await storage.getRegistrationCount(id);
      res.json({ count: registrationCount });
    } catch (error) {
      res.status(500).json({ message: "Error fetching registration count" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
