import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  source: text("source").notNull(), // 'quiz', 'blueprint', 'audit'
  quizResults: jsonb("quiz_results"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const quizQuestions = pgTable("quiz_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // Array of option objects
  category: text("category").notNull(), // 'hormonal', 'sleep', 'energy', 'overwhelm'
  order: integer("order").notNull(),
});

export const quizResponses = pgTable("quiz_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id),
  questionId: varchar("question_id").references(() => quizQuestions.id),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(), // 'hormones', 'sleep', 'energy', 'basics'
  description: text("description").notNull(),
  benefits: jsonb("benefits").notNull(), // Array of benefit strings
  price: text("price").notNull(),
  affiliateUrl: text("affiliate_url").notNull(),
  rating: text("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 'sleep', 'hormones', 'quality', 'mood', etc.
  imageUrl: text("image_url"),
  readTime: integer("read_time").notNull(), // in minutes
  author: text("author").notNull(),
  featured: boolean("featured").default(false),
  publishedAt: timestamp("published_at").default(sql`now()`),
  slug: text("slug").notNull().unique(),
});

export const stackAuditRequests = pgTable("stack_audit_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  currentSupplements: text("current_supplements").notNull(),
  healthGoals: text("health_goals").notNull(),
  challenges: text("challenges").notNull(),
  budget: text("budget"),
  status: text("status").default("pending"), // 'pending', 'in_progress', 'completed'
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Insert schemas
export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({
  id: true,
  createdAt: true,
});

export const insertStackAuditRequestSchema = createInsertSchema(stackAuditRequests).omit({
  id: true,
  createdAt: true,
  status: true,
});

// Types
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type QuizResponse = typeof quizResponses.$inferSelect;
export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
export type Product = typeof products.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type StackAuditRequest = typeof stackAuditRequests.$inferSelect;
export type InsertStackAuditRequest = z.infer<typeof insertStackAuditRequestSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferSelect;
