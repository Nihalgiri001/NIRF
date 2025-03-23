import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Institution schema
export const institutions = pgTable("institutions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  type: text("type").notNull(), // Public, Private, Deemed University, etc.
});

export const insertInstitutionSchema = createInsertSchema(institutions).pick({
  name: true,
  city: true,
  state: true,
  type: true,
});

export type InsertInstitution = z.infer<typeof insertInstitutionSchema>;
export type Institution = typeof institutions.$inferSelect;

// Ranking schema
export const rankings = pgTable("rankings", {
  id: serial("id").primaryKey(),
  institutionId: integer("institution_id").notNull(),
  year: integer("year").notNull(),
  category: text("category").notNull(), // Overall, University, Engineering, etc.
  rank: integer("rank").notNull(),
  
  // TLR (Teaching, Learning & Resources) breakdown
  ssScore: real("ss_score"), // Student Strength
  fsrScore: real("fsr_score"), // Faculty-Student Ratio
  fqeScore: real("fqe_score"), // Faculty Qualification & Experience  
  fruScore: real("fru_score"), // Faculty Recruitment & Utilization
  
  // RPC (Research and Professional Practice) breakdown
  puScore: real("pu_score"), // Publications
  qpScore: real("qp_score"), // Quality of Publications
  iprScore: real("ipr_score"), // IPR and Patents
  fpppScore: real("fppp_score"), // Footprint of Projects & Professional Practice
  
  // GO (Graduation Outcomes) breakdown
  gphScore: real("gph_score"), // Graduation Performance in Higher Studies
  gueScore: real("gue_score"), // University Examinations
  msScore: real("ms_score"), // Median Salary
  gphdScore: real("gphd_score"), // Graduating Students in PhD
  
  // OI (Outreach and Inclusivity) breakdown
  rdScore: real("rd_score"), // Regional Diversity
  wdScore: real("wd_score"), // Women Diversity
  escsScore: real("escs_score"), // Economically & Socially Challenged Students
  pcsScore: real("pcs_score"), // Facilities for Physically Challenged Students
  
  // Scores for main categories
  tlrScore: real("tlr_score").notNull(), // Teaching, Learning & Resources
  rpcScore: real("rpc_score").notNull(), // Research and Professional Practice
  goScore: real("go_score").notNull(),   // Graduation Outcomes
  oiScore: real("oi_score").notNull(),   // Outreach and Inclusivity
  prScore: real("pr_score").notNull(),   // Perception
  totalScore: real("total_score").notNull(),
});

export const insertRankingSchema = createInsertSchema(rankings).pick({
  institutionId: true,
  year: true,
  category: true,
  rank: true,
  // TLR breakdown
  ssScore: true,
  fsrScore: true,
  fqeScore: true,
  fruScore: true,
  // RPC breakdown
  puScore: true,
  qpScore: true,
  iprScore: true,
  fpppScore: true,
  // GO breakdown
  gphScore: true,
  gueScore: true,
  msScore: true,
  gphdScore: true,
  // OI breakdown
  rdScore: true,
  wdScore: true,
  escsScore: true,
  pcsScore: true,
  // Main scores
  tlrScore: true,
  rpcScore: true,
  goScore: true,
  oiScore: true,
  prScore: true,
  totalScore: true,
});

export type InsertRanking = z.infer<typeof insertRankingSchema>;
export type Ranking = typeof rankings.$inferSelect;

// Announcement schema
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  isActive: integer("is_active").notNull().default(1),
  createdAt: text("created_at").notNull(),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).pick({
  text: true,
  isActive: true,
  createdAt: true,
});

export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type Announcement = typeof announcements.$inferSelect;

// Combined ranking with institution details
export type RankingWithInstitution = Ranking & {
  institution: Institution;
};
