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
