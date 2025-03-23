import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { read, utils } from "xlsx";
import { z } from "zod";
import { insertRankingSchema, insertInstitutionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Set up multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route("/api");
  
  // Get announcements
  app.get("/api/announcements", async (req: Request, res: Response) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      res.status(500).json({ message: "Error fetching announcements" });
    }
  });
  
  // Get rankings with optional filters
  app.get("/api/rankings", async (req: Request, res: Response) => {
    try {
      const { year, category, type, search } = req.query;
      
      const filters = {
        year: year ? parseInt(year as string) : undefined,
        category: category as string | undefined,
        institutionType: type as string | undefined,
        search: search as string | undefined
      };
      
      const rankings = await storage.getRankings(filters);
      res.json(rankings);
    } catch (error) {
      console.error("Error fetching rankings:", error);
      res.status(500).json({ message: "Error fetching rankings" });
    }
  });
  
  // Get all institutions
  app.get("/api/institutions", async (req: Request, res: Response) => {
    try {
      const institutions = await storage.getInstitutions();
      res.json(institutions);
    } catch (error) {
      console.error("Error fetching institutions:", error);
      res.status(500).json({ message: "Error fetching institutions" });
    }
  });
  
  // Import Excel file
  app.post("/api/import", upload.single("file"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      // Read Excel file
      const workbook = read(req.file.buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = utils.sheet_to_json(worksheet) as Record<string, any>[];
      
      if (!data || data.length === 0) {
        return res.status(400).json({ message: "No data found in the Excel file" });
      }
      
      // Process institutions first
      const institutions = new Map();
      for (const row of data) {
        const institutionData = {
          name: row.Institution as string,
          city: row.City as string,
          state: row.State as string,
          type: (row.Type as string) || "Unknown"
        };
        
        try {
          const validatedInstitution = insertInstitutionSchema.parse(institutionData);
          
          // Check if we already have this institution
          const existingInstitutions = await storage.getInstitutions();
          const existingInstitution = existingInstitutions.find(i => 
            i.name === validatedInstitution.name && 
            i.city === validatedInstitution.city && 
            i.state === validatedInstitution.state
          );
          
          if (existingInstitution) {
            institutions.set(`${validatedInstitution.name}-${validatedInstitution.city}`, existingInstitution.id);
          } else {
            const newInstitution = await storage.createInstitution(validatedInstitution);
            institutions.set(`${validatedInstitution.name}-${validatedInstitution.city}`, newInstitution.id);
          }
        } catch (error) {
          console.error("Error processing institution data:", error);
          return res.status(400).json({ 
            message: "Invalid institution data in Excel file",
            details: fromZodError(error as z.ZodError).message
          });
        }
      }
      
      // Process rankings
      const rankings = [];
      for (const row of data) {
        const institutionId = institutions.get(`${row.Institution as string}-${row.City as string}`);
        
        if (!institutionId) {
          return res.status(400).json({ 
            message: `Could not find or create institution: ${row.Institution as string}, ${row.City as string}` 
          });
        }
        
        const rankingData = {
          institutionId,
          year: parseInt(row.Year as string),
          category: row.Category as string,
          rank: parseInt(row.Rank as string),
          
          // TLR Parameters (Teaching, Learning & Resources)
          ssScore: row.SS ? parseFloat(row.SS as string) : undefined,
          fsrScore: row.FSR ? parseFloat(row.FSR as string) : undefined,
          fqeScore: row.FQE ? parseFloat(row.FQE as string) : undefined,
          fruScore: row.FRU ? parseFloat(row.FRU as string) : undefined,
          
          // RPC Parameters (Research and Professional Practice)
          puScore: row.PU ? parseFloat(row.PU as string) : undefined,
          qpScore: row.QP ? parseFloat(row.QP as string) : undefined,
          iprScore: row.IPR ? parseFloat(row.IPR as string) : undefined,
          fpppScore: row.FPPP ? parseFloat(row.FPPP as string) : undefined,
          
          // GO Parameters (Graduation Outcomes)
          gphScore: row.GPH ? parseFloat(row.GPH as string) : undefined,
          gueScore: row.GUE ? parseFloat(row.GUE as string) : undefined,
          msScore: row.MS ? parseFloat(row.MS as string) : undefined,
          gphdScore: row.GPHD ? parseFloat(row.GPHD as string) : undefined,
          
          // OI Parameters (Outreach and Inclusivity)
          rdScore: row.RD ? parseFloat(row.RD as string) : undefined,
          wdScore: row.WD ? parseFloat(row.WD as string) : undefined,
          escsScore: row.ESCS ? parseFloat(row.ESCS as string) : undefined,
          pcsScore: row.PCS ? parseFloat(row.PCS as string) : undefined,
          
          // Main category scores
          tlrScore: parseFloat(row.TLR as string),
          rpcScore: parseFloat(row.RPC as string),
          goScore: parseFloat(row.GO as string),
          oiScore: parseFloat(row.OI as string),
          prScore: parseFloat(row.PR as string),
          totalScore: parseFloat(row.TotalScore as string)
        };
        
        try {
          const validatedRanking = insertRankingSchema.parse(rankingData);
          rankings.push(validatedRanking);
        } catch (error) {
          console.error("Error processing ranking data:", error);
          return res.status(400).json({ 
            message: "Invalid ranking data in Excel file",
            details: fromZodError(error as z.ZodError).message
          });
        }
      }
      
      // Save all rankings
      await storage.bulkCreateRankings(rankings);
      
      res.status(200).json({ 
        message: "Import successful", 
        institutionsCount: institutions.size, 
        rankingsCount: rankings.length 
      });
    } catch (error) {
      console.error("Error importing Excel file:", error);
      res.status(500).json({ message: "Error importing Excel file" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
