import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { read, utils } from "xlsx";
import { z } from "zod";
import { insertRankingSchema, insertInstitutionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { 
  InstitutionRawData, 
  calculateRankingScores, 
  calculateTLRScore,
  calculateRPCScore,
  calculateGOScore,
  calculateOIScore,
  calculatePRScore,
  calculateOverallScore
} from "./utils/ranking-calculations";

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
        // Check if this is the new template format or the old format
        const institutionName = row["Institution Name"] || row.Institution;
        const institutionCity = row.City || "";
        const institutionState = row.State;
        const institutionType = row["Institution Type"] || row.Type || "Unknown";
        
        if (!institutionName || !institutionState) {
          return res.status(400).json({ 
            message: "Missing required fields: Institution Name and State are required" 
          });
        }
        
        const institutionData = {
          name: institutionName as string,
          city: institutionCity as string,
          state: institutionState as string,
          type: institutionType as string
        };
        
        try {
          const validatedInstitution = insertInstitutionSchema.parse(institutionData);
          
          // Check if we already have this institution
          const existingInstitutions = await storage.getInstitutions();
          const existingInstitution = existingInstitutions.find(i => 
            i.name === validatedInstitution.name && 
            i.state === validatedInstitution.state
          );
          
          if (existingInstitution) {
            institutions.set(`${validatedInstitution.name}-${validatedInstitution.state}`, existingInstitution.id);
          } else {
            const newInstitution = await storage.createInstitution(validatedInstitution);
            institutions.set(`${validatedInstitution.name}-${validatedInstitution.state}`, newInstitution.id);
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
        const institutionName = row["Institution Name"] || row.Institution;
        const institutionState = row.State;
        
        const institutionId = institutions.get(`${institutionName}-${institutionState}`);
        
        if (!institutionId) {
          return res.status(400).json({ 
            message: `Could not find or create institution: ${institutionName}, ${institutionState}` 
          });
        }
        
        const year = parseInt(row.Year as string);
        const category = row.Category as string || 'Engineering';
        const rank = parseInt(row.Rank as string) || 0;

        let rankingData: Record<string, any>;
        
        // Check if we have raw data to calculate scores or pre-calculated scores
        if (row["Faculty Count"] !== undefined || 
            row["Total Students"] !== undefined ||
            row["Research Publications"] !== undefined) {
          // We have raw data, calculate the scores
          const rawData: InstitutionRawData = {
            name: institutionName as string,
            state: institutionState as string,
            type: (row["Institution Type"] || row.Type || "Unknown") as string,
            establishedYear: parseInt(row["Established Year"] as string) || 2000,
            
            // Faculty data
            facultyCount: parseInt(row["Faculty Count"] as string) || 0,
            facultyWithPhD: parseInt(row["Faculty with PhD"] as string) || 0,
            facultyExperience: parseFloat(row["Average Faculty Experience (years)"] as string) || 0,
            sanctionedFacultyPositions: parseInt(row["Sanctioned Faculty Positions"] as string) || 0,
            
            // Student data
            totalStudents: parseInt(row["Total Students"] as string) || 0,
            femaleStudents: parseInt(row["Female Students"] as string) || 0,
            scStStudents: parseInt(row["SC/ST Students"] as string) || 0,
            economicallyBackwardStudents: parseInt(row["Economically Backward Students"] as string) || 0,
            physicallyHandicappedStudents: parseInt(row["Physically Handicapped Students"] as string) || 0,
            phDStudents: parseInt(row["PhD Students"] as string) || 0,
            
            // Geographic diversity
            studentsFromOtherStates: parseInt(row["Students From Other States"] as string) || 0,
            studentsFromAbroadCount: parseInt(row["Students From Abroad"] as string) || 0,
            
            // Research & Publications
            researchPublications: parseInt(row["Research Publications"] as string) || 0,
            citationsCount: parseInt(row["Citations Count"] as string) || 0,
            patentsFiled: parseInt(row["Patents Filed"] as string) || 0,
            patentsGranted: parseInt(row["Patents Granted"] as string) || 0,
            sponsoredResearchFunding: parseFloat(row["Sponsored Research Funding (Lakhs)"] as string) || 0,
            consultancyEarnings: parseFloat(row["Consultancy Earnings (Lakhs)"] as string) || 0,
            
            // Placement & Higher Studies
            graduatesInHigherStudies: parseInt(row["Graduates in Higher Studies"] as string) || 0,
            graduatesPlaced: parseInt(row["Graduates Placed"] as string) || 0,
            medianSalary: parseFloat(row["Median Salary (Lakhs)"] as string) || 0,
            
            // Graduation metrics
            totalGraduates: parseInt(row["Total Graduates"] as string) || 0,
            graduatesInStipulatedTime: parseInt(row["Graduates in Stipulated Time"] as string) || 0,
            
            // Perceptual ranking
            peerPerceptionScore: parseFloat(row["Peer Perception Score"] as string) || 0
          };
          
          // Calculate all scores
          const scores = calculateRankingScores(rawData);
          
          rankingData = {
            institutionId,
            year,
            category,
            rank,
            ...scores
          };
          
          console.log(`Calculated scores for ${institutionName}:`, scores);
        } else {
          // We have pre-calculated scores
          rankingData = {
            institutionId,
            year,
            category,
            rank,
            
            // TLR Parameters (Teaching, Learning & Resources)
            ssScore: row.SS ? parseFloat(row.SS as string) : null,
            fsrScore: row.FSR ? parseFloat(row.FSR as string) : null,
            fqeScore: row.FQE ? parseFloat(row.FQE as string) : null,
            fruScore: row.FRU ? parseFloat(row.FRU as string) : null,
            
            // RPC Parameters (Research and Professional Practice)
            puScore: row.PU ? parseFloat(row.PU as string) : null,
            qpScore: row.QP ? parseFloat(row.QP as string) : null,
            iprScore: row.IPR ? parseFloat(row.IPR as string) : null,
            fpppScore: row.FPPP ? parseFloat(row.FPPP as string) : null,
            
            // GO Parameters (Graduation Outcomes)
            gphScore: row.GPH ? parseFloat(row.GPH as string) : null,
            gueScore: row.GUE ? parseFloat(row.GUE as string) : null,
            msScore: row.MS ? parseFloat(row.MS as string) : null,
            gphdScore: row.GPHD ? parseFloat(row.GPHD as string) : null,
            
            // OI Parameters (Outreach and Inclusivity)
            rdScore: row.RD ? parseFloat(row.RD as string) : null,
            wdScore: row.WD ? parseFloat(row.WD as string) : null,
            escsScore: row.ESCS ? parseFloat(row.ESCS as string) : null,
            pcsScore: row.PCS ? parseFloat(row.PCS as string) : null,
            
            // Main category scores
            tlrScore: row.TLR ? parseFloat(row.TLR as string) : null,
            rpcScore: row.RPC ? parseFloat(row.RPC as string) : null,
            goScore: row.GO ? parseFloat(row.GO as string) : null,
            oiScore: row.OI ? parseFloat(row.OI as string) : null,
            prScore: row.PR ? parseFloat(row.PR as string) : null,
            totalScore: row.TotalScore ? parseFloat(row.TotalScore as string) : null
          };
          
          // Calculate totals if individual scores are provided but totals are missing
          if (!rankingData.tlrScore && 
             (rankingData.ssScore || rankingData.fsrScore || rankingData.fqeScore || rankingData.fruScore)) {
            const ss = rankingData.ssScore || 0;
            const fsr = rankingData.fsrScore || 0;
            const fqe = rankingData.fqeScore || 0;
            const fru = rankingData.fruScore || 0;
            rankingData.tlrScore = ss + fsr + fqe + fru;
          }
          
          if (!rankingData.rpcScore && 
             (rankingData.puScore || rankingData.qpScore || rankingData.iprScore || rankingData.fpppScore)) {
            const pu = rankingData.puScore || 0;
            const qp = rankingData.qpScore || 0;
            const ipr = rankingData.iprScore || 0;
            const fppp = rankingData.fpppScore || 0;
            rankingData.rpcScore = pu + qp + ipr + fppp;
          }
          
          if (!rankingData.goScore && 
             (rankingData.gphScore || rankingData.gueScore || rankingData.msScore || rankingData.gphdScore)) {
            const gph = rankingData.gphScore || 0;
            const gue = rankingData.gueScore || 0;
            const ms = rankingData.msScore || 0;
            const gphd = rankingData.gphdScore || 0;
            rankingData.goScore = gph + gue + ms + gphd;
          }
          
          if (!rankingData.oiScore && 
             (rankingData.rdScore || rankingData.wdScore || rankingData.escsScore || rankingData.pcsScore)) {
            const rd = rankingData.rdScore || 0;
            const wd = rankingData.wdScore || 0;
            const escs = rankingData.escsScore || 0;
            const pcs = rankingData.pcsScore || 0;
            rankingData.oiScore = rd + wd + escs + pcs;
          }
          
          // Calculate total score if not provided
          if (!rankingData.totalScore) {
            const tlr = rankingData.tlrScore || 0;
            const rpc = rankingData.rpcScore || 0;
            const go = rankingData.goScore || 0;
            const oi = rankingData.oiScore || 0;
            const pr = rankingData.prScore || 0;
            
            rankingData.totalScore = (tlr * 0.3 + rpc * 0.3 + go * 0.2 + oi * 0.1 + pr * 0.1);
          }
        }
        
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
