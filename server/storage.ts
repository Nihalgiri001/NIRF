import { 
  users, 
  type User, 
  type InsertUser,
  institutions,
  type Institution,
  type InsertInstitution,
  rankings,
  type Ranking,
  type InsertRanking,
  announcements,
  type Announcement,
  type InsertAnnouncement,
  type RankingWithInstitution
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Institution methods
  getInstitutions(): Promise<Institution[]>;
  getInstitution(id: number): Promise<Institution | undefined>;
  createInstitution(institution: InsertInstitution): Promise<Institution>;
  
  // Ranking methods
  getRankings(filters?: {
    year?: number,
    category?: string,
    institutionType?: string,
    search?: string
  }): Promise<RankingWithInstitution[]>;
  getRanking(id: number): Promise<Ranking | undefined>;
  createRanking(ranking: InsertRanking): Promise<Ranking>;
  bulkCreateRankings(rankings: InsertRanking[]): Promise<Ranking[]>;
  
  // Announcement methods
  getAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private institutions: Map<number, Institution>;
  private rankings: Map<number, Ranking>;
  private announcements: Map<number, Announcement>;
  
  private userId: number;
  private institutionId: number;
  private rankingId: number;
  private announcementId: number;

  constructor() {
    this.users = new Map();
    this.institutions = new Map();
    this.rankings = new Map();
    this.announcements = new Map();
    
    this.userId = 1;
    this.institutionId = 1;
    this.rankingId = 1;
    this.announcementId = 1;
    
    // Add some initial announcements
    this.seedAnnouncements();
    // Add some sample institutions and rankings
    this.seedInstitutions();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Institution methods
  async getInstitutions(): Promise<Institution[]> {
    return Array.from(this.institutions.values());
  }
  
  async getInstitution(id: number): Promise<Institution | undefined> {
    return this.institutions.get(id);
  }
  
  async createInstitution(institution: InsertInstitution): Promise<Institution> {
    const id = this.institutionId++;
    const newInstitution: Institution = { ...institution, id };
    this.institutions.set(id, newInstitution);
    return newInstitution;
  }
  
  // Ranking methods
  async getRankings(filters?: {
    year?: number,
    category?: string,
    institutionType?: string,
    search?: string
  }): Promise<RankingWithInstitution[]> {
    const rankingsArray = Array.from(this.rankings.values());
    
    // Filter rankings based on provided filters
    let filteredRankings = rankingsArray;
    
    if (filters) {
      if (filters.year) {
        filteredRankings = filteredRankings.filter(r => r.year === filters.year);
      }
      
      if (filters.category) {
        filteredRankings = filteredRankings.filter(r => r.category === filters.category);
      }
    }
    
    // Add institution details to rankings
    const rankingsWithInstitutions = filteredRankings.map(ranking => {
      const institution = this.institutions.get(ranking.institutionId);
      
      if (!institution) {
        throw new Error(`Institution with ID ${ranking.institutionId} not found`);
      }
      
      // Only include institutions from Andhra Pradesh and Telangana
      if (institution.state !== "Andhra Pradesh" && institution.state !== "Telangana") {
        return null;
      }
      
      // Further filter by institution type if specified
      if (filters?.institutionType && institution.type !== filters.institutionType) {
        return null;
      }
      
      // Filter by search term if provided
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!institution.name.toLowerCase().includes(searchTerm) && 
            !institution.city.toLowerCase().includes(searchTerm) && 
            !institution.state.toLowerCase().includes(searchTerm)) {
          return null;
        }
      }
      
      return { ...ranking, institution };
    }).filter(Boolean) as RankingWithInstitution[];
    
    // Default sort by rank
    return rankingsWithInstitutions.sort((a, b) => a.rank - b.rank);
  }
  
  async getRanking(id: number): Promise<Ranking | undefined> {
    return this.rankings.get(id);
  }
  
  async createRanking(ranking: InsertRanking): Promise<Ranking> {
    const id = this.rankingId++;
    
    // Create default values for all the new fields
    const newRanking: Ranking = {
      ...ranking,
      id,
      // Set default values for the fields if they're not provided
      ssScore: ranking.ssScore ?? null,
      fsrScore: ranking.fsrScore ?? null,
      fqeScore: ranking.fqeScore ?? null,
      fruScore: ranking.fruScore ?? null,
      puScore: ranking.puScore ?? null,
      qpScore: ranking.qpScore ?? null,
      iprScore: ranking.iprScore ?? null,
      fpppScore: ranking.fpppScore ?? null,
      gphScore: ranking.gphScore ?? null,
      gueScore: ranking.gueScore ?? null,
      msScore: ranking.msScore ?? null,
      gphdScore: ranking.gphdScore ?? null,
      rdScore: ranking.rdScore ?? null,
      wdScore: ranking.wdScore ?? null,
      escsScore: ranking.escsScore ?? null,
      pcsScore: ranking.pcsScore ?? null
    };
    
    this.rankings.set(id, newRanking);
    return newRanking;
  }
  
  async bulkCreateRankings(rankings: InsertRanking[]): Promise<Ranking[]> {
    const createdRankings: Ranking[] = [];
    
    for (const ranking of rankings) {
      const newRanking = await this.createRanking(ranking);
      createdRankings.push(newRanking);
    }
    
    return createdRankings;
  }
  
  // Announcement methods
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values())
      .filter(a => a.isActive === 1)
      .sort((a, b) => b.id - a.id);
  }
  
  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const id = this.announcementId++;
    const newAnnouncement: Announcement = { 
      ...announcement, 
      id,
      isActive: announcement.isActive || 1 // Ensure isActive has a value
    };
    this.announcements.set(id, newAnnouncement);
    return newAnnouncement;
  }
  
  // Seed data methods
  private seedAnnouncements() {
    const announcements: InsertAnnouncement[] = [
      {
        text: "NIRF Rankings 2023 released on September 10, 2023 by Honorable Minister of Education.",
        isActive: 1,
        createdAt: new Date().toISOString()
      },
      {
        text: "Data submission for NIRF 2024 will open in December 2023. Stay tuned for updates.",
        isActive: 1,
        createdAt: new Date().toISOString()
      },
      {
        text: "Webinars on NIRF methodology scheduled for November 15-20, 2023.",
        isActive: 1,
        createdAt: new Date().toISOString()
      },
      {
        text: "Special ranking insights for Andhra Pradesh and Telangana institutions now available.",
        isActive: 1,
        createdAt: new Date().toISOString()
      }
    ];
    
    announcements.forEach(a => {
      this.createAnnouncement(a);
    });
  }
  
  private seedInstitutions() {
    const institutions: InsertInstitution[] = [
      // Andhra Pradesh Institutions
      { name: "Indian Institute of Technology Tirupati", city: "Tirupati", state: "Andhra Pradesh", type: "Public" },
      { name: "Andhra University", city: "Visakhapatnam", state: "Andhra Pradesh", type: "State University" },
      { name: "Sri Venkateswara University", city: "Tirupati", state: "Andhra Pradesh", type: "State University" },
      { name: "GITAM University", city: "Visakhapatnam", state: "Andhra Pradesh", type: "Deemed University" },
      { name: "Koneru Lakshmaiah Education Foundation", city: "Guntur", state: "Andhra Pradesh", type: "Deemed University" },
      { name: "VIT-AP University", city: "Amaravati", state: "Andhra Pradesh", type: "Private" },
      { name: "SRM University, AP", city: "Amaravati", state: "Andhra Pradesh", type: "Private" },
      
      // Telangana Institutions
      { name: "Indian Institute of Technology Hyderabad", city: "Hyderabad", state: "Telangana", type: "Public" },
      { name: "University of Hyderabad", city: "Hyderabad", state: "Telangana", type: "Central University" },
      { name: "Osmania University", city: "Hyderabad", state: "Telangana", type: "State University" },
      { name: "NALSAR University of Law", city: "Hyderabad", state: "Telangana", type: "Public" },
      { name: "International Institute of Information Technology", city: "Hyderabad", state: "Telangana", type: "Deemed University" },
      { name: "The English and Foreign Languages University", city: "Hyderabad", state: "Telangana", type: "Central University" },
      { name: "ICFAI Foundation for Higher Education", city: "Hyderabad", state: "Telangana", type: "Deemed University" },
      { name: "Birla Institute of Technology and Science", city: "Hyderabad", state: "Telangana", type: "Private" }
    ];
    
    // Create institutions and map for rankings
    const institutionIds: number[] = [];
    
    institutions.forEach(async (i) => {
      const institution = await this.createInstitution(i);
      institutionIds.push(institution.id);
    });
    
    // Create rankings for these institutions (Overall category)
    setTimeout(() => {
      // For Andhra Pradesh
      const apRankings: InsertRanking[] = [
        { 
          institutionId: 1, year: 2023, category: "Overall", rank: 24,
          tlrScore: 79.12, rpcScore: 70.45, goScore: 73.98, oiScore: 68.23, prScore: 72.56, totalScore: 74.32
        },
        { 
          institutionId: 2, year: 2023, category: "Overall", rank: 31,
          tlrScore: 74.23, rpcScore: 68.78, goScore: 72.45, oiScore: 71.32, prScore: 63.87, totalScore: 70.88
        },
        { 
          institutionId: 3, year: 2023, category: "Overall", rank: 43,
          tlrScore: 71.56, rpcScore: 62.34, goScore: 69.87, oiScore: 73.21, prScore: 61.23, totalScore: 67.65
        },
        { 
          institutionId: 4, year: 2023, category: "Overall", rank: 57,
          tlrScore: 68.92, rpcScore: 58.76, goScore: 66.32, oiScore: 70.56, prScore: 59.87, totalScore: 64.89
        },
        { 
          institutionId: 5, year: 2023, category: "Overall", rank: 64,
          tlrScore: 67.23, rpcScore: 56.45, goScore: 64.23, oiScore: 69.12, prScore: 58.32, totalScore: 63.21
        },
        { 
          institutionId: 6, year: 2023, category: "Overall", rank: 72,
          tlrScore: 64.56, rpcScore: 52.23, goScore: 61.87, oiScore: 66.45, prScore: 55.78, totalScore: 60.43
        },
        { 
          institutionId: 7, year: 2023, category: "Overall", rank: 78,
          tlrScore: 62.34, rpcScore: 49.87, goScore: 59.56, oiScore: 64.23, prScore: 53.67, totalScore: 58.12
        },
        
        // For Telangana
        { 
          institutionId: 8, year: 2023, category: "Overall", rank: 9,
          tlrScore: 87.34, rpcScore: 84.56, goScore: 78.92, oiScore: 75.67, prScore: 81.23, totalScore: 82.56
        },
        { 
          institutionId: 9, year: 2023, category: "Overall", rank: 11,
          tlrScore: 85.67, rpcScore: 82.34, goScore: 77.45, oiScore: 74.12, prScore: 79.87, totalScore: 80.76
        },
        { 
          institutionId: 10, year: 2023, category: "Overall", rank: 15,
          tlrScore: 83.23, rpcScore: 78.92, goScore: 75.67, oiScore: 72.45, prScore: 77.34, totalScore: 78.12
        },
        { 
          institutionId: 11, year: 2023, category: "Overall", rank: 17,
          tlrScore: 82.45, rpcScore: 76.23, goScore: 74.56, oiScore: 71.23, prScore: 76.67, totalScore: 77.23
        },
        { 
          institutionId: 12, year: 2023, category: "Overall", rank: 22,
          tlrScore: 80.12, rpcScore: 75.67, goScore: 72.34, oiScore: 69.87, prScore: 74.56, totalScore: 75.67
        },
        { 
          institutionId: 13, year: 2023, category: "Overall", rank: 34,
          tlrScore: 76.87, rpcScore: 70.23, goScore: 68.92, oiScore: 65.67, prScore: 71.23, totalScore: 72.12
        },
        { 
          institutionId: 14, year: 2023, category: "Overall", rank: 45,
          tlrScore: 72.45, rpcScore: 67.89, goScore: 65.67, oiScore: 62.45, prScore: 68.92, totalScore: 68.34
        },
        { 
          institutionId: 15, year: 2023, category: "Overall", rank: 53,
          tlrScore: 69.87, rpcScore: 63.45, goScore: 62.34, oiScore: 59.87, prScore: 65.67, totalScore: 65.23
        }
      ];
      
      // Engineering category rankings with detailed parameter breakdown
      const engineeringRankings: InsertRanking[] = [
        // Andhra Pradesh
        { 
          institutionId: 1, year: 2023, category: "Engineering", rank: 15,
          // TLR breakdown - Teaching, Learning & Resources
          ssScore: 18.50, fsrScore: 30.00, fqeScore: 17.29, fruScore: 30.00,
          // RPC breakdown - Research and Professional Practice
          puScore: 34.95, qpScore: 34.37, iprScore: 14.00, fpppScore: 9.78,
          // GO breakdown - Graduation Outcomes
          gphScore: 29.74, gueScore: 15.00, msScore: 19.34, gphdScore: 16.98,
          // OI breakdown - Outreach and Inclusivity
          rdScore: 21.57, wdScore: 14.88, escsScore: 9.49, pcsScore: 20.00,
          // Main scores
          tlrScore: 84.23, rpcScore: 75.67, goScore: 76.45, oiScore: 70.23, prScore: 79.87, totalScore: 78.34
        },
        { 
          institutionId: 4, year: 2023, category: "Engineering", rank: 39,
          // TLR breakdown
          ssScore: 16.82, fsrScore: 27.65, fqeScore: 15.56, fruScore: 26.78,
          // RPC breakdown
          puScore: 30.12, qpScore: 29.87, iprScore: 10.25, fpppScore: 8.32,
          // GO breakdown
          gphScore: 25.34, gueScore: 14.23, msScore: 17.56, gphdScore: 14.21,
          // OI breakdown
          rdScore: 18.78, wdScore: 13.45, escsScore: 8.67, pcsScore: 17.54,
          // Main scores
          tlrScore: 72.45, rpcScore: 63.87, goScore: 68.92, oiScore: 64.67, prScore: 61.23, totalScore: 67.23
        },
        { 
          institutionId: 5, year: 2023, category: "Engineering", rank: 47,
          // TLR breakdown
          ssScore: 15.43, fsrScore: 26.54, fqeScore: 14.87, fruScore: 25.32,
          // RPC breakdown
          puScore: 28.65, qpScore: 27.45, iprScore: 9.87, fpppScore: 7.65,
          // GO breakdown
          gphScore: 24.23, gueScore: 13.56, msScore: 16.78, gphdScore: 13.45,
          // OI breakdown
          rdScore: 17.65, wdScore: 12.98, escsScore: 8.12, pcsScore: 16.43,
          // Main scores
          tlrScore: 69.87, rpcScore: 60.23, goScore: 65.67, oiScore: 62.45, prScore: 58.92, totalScore: 64.56
        },
        
        // Telangana
        { 
          institutionId: 8, year: 2023, category: "Engineering", rank: 8,
          // TLR breakdown
          ssScore: 19.87, fsrScore: 32.45, fqeScore: 18.76, fruScore: 31.98,
          // RPC breakdown
          puScore: 36.87, qpScore: 36.45, iprScore: 15.87, fpppScore: 10.56,
          // GO breakdown
          gphScore: 31.45, gueScore: 16.78, msScore: 20.87, gphdScore: 18.32,
          // OI breakdown
          rdScore: 23.45, wdScore: 16.32, escsScore: 10.23, pcsScore: 21.54,
          // Main scores
          tlrScore: 89.67, rpcScore: 86.23, goScore: 80.45, oiScore: 77.34, prScore: 84.56, totalScore: 84.87
        },
        { 
          institutionId: 12, year: 2023, category: "Engineering", rank: 13,
          // TLR breakdown
          ssScore: 19.23, fsrScore: 31.78, fqeScore: 18.12, fruScore: 30.87,
          // RPC breakdown
          puScore: 35.98, qpScore: 35.54, iprScore: 14.98, fpppScore: 10.12,
          // GO breakdown
          gphScore: 30.87, gueScore: 15.98, msScore: 19.87, gphdScore: 17.65,
          // OI breakdown
          rdScore: 22.87, wdScore: 15.78, escsScore: 9.87, pcsScore: 20.87,
          // Main scores
          tlrScore: 85.45, rpcScore: 83.67, goScore: 78.92, oiScore: 75.67, prScore: 81.23, totalScore: 81.78
        },
        { 
          institutionId: 15, year: 2023, category: "Engineering", rank: 32,
          // TLR breakdown
          ssScore: 17.54, fsrScore: 28.76, fqeScore: 16.32, fruScore: 27.98,
          // RPC breakdown
          puScore: 31.56, qpScore: 30.98, iprScore: 11.45, fpppScore: 8.87,
          // GO breakdown
          gphScore: 26.54, gueScore: 14.76, msScore: 18.12, gphdScore: 15.32,
          // OI breakdown
          rdScore: 19.54, wdScore: 14.12, escsScore: 9.12, pcsScore: 18.34,
          // Main scores
          tlrScore: 76.23, rpcScore: 72.45, goScore: 70.67, oiScore: 67.89, prScore: 73.56, totalScore: 73.12
        }
      ];
      
      // Management category rankings
      const managementRankings: InsertRanking[] = [
        // Andhra Pradesh
        { 
          institutionId: 4, year: 2023, category: "Management", rank: 23,
          tlrScore: 78.92, rpcScore: 69.87, goScore: 74.56, oiScore: 72.34, prScore: 75.67, totalScore: 74.87
        },
        { 
          institutionId: 5, year: 2023, category: "Management", rank: 31,
          tlrScore: 75.67, rpcScore: 65.43, goScore: 71.23, oiScore: 69.87, prScore: 72.45, totalScore: 71.56
        },
        
        // Telangana
        { 
          institutionId: 10, year: 2023, category: "Management", rank: 19,
          tlrScore: 80.45, rpcScore: 72.34, goScore: 76.23, oiScore: 74.56, prScore: 77.89, totalScore: 76.92
        },
        { 
          institutionId: 14, year: 2023, category: "Management", rank: 25,
          tlrScore: 77.34, rpcScore: 68.92, goScore: 73.45, oiScore: 71.23, prScore: 74.56, totalScore: 73.76
        }
      ];
      
      // Combine all rankings
      const allRankings = [...apRankings, ...engineeringRankings, ...managementRankings];
      
      // Add previous year (2022) data with slight differences
      const previousYearRankings = allRankings.map(ranking => ({
        ...ranking,
        year: 2022,
        rank: ranking.rank + (Math.floor(Math.random() * 5) - 2), // Slight rank difference from 2023
        tlrScore: +(ranking.tlrScore - (Math.random() * 2)).toFixed(2),
        rpcScore: +(ranking.rpcScore - (Math.random() * 2)).toFixed(2),
        goScore: +(ranking.goScore - (Math.random() * 2)).toFixed(2),
        oiScore: +(ranking.oiScore - (Math.random() * 2)).toFixed(2),
        prScore: +(ranking.prScore - (Math.random() * 2)).toFixed(2),
        totalScore: +(ranking.totalScore - (Math.random() * 2)).toFixed(2),
      }));
      
      const combinedRankings = [...allRankings, ...previousYearRankings];
      
      combinedRankings.forEach(async (r) => {
        await this.createRanking(r);
      });
    }, 100); // Small delay to ensure institutions are created first
  }
}

export const storage = new MemStorage();
