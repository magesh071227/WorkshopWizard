import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
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

// Workshop categories
export const CATEGORIES = ['Technology', 'Design', 'Business', 'Marketing', 'Personal Development'] as const;
export type Category = typeof CATEGORIES[number];

export const workshops = pgTable("workshops", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  summary: text("summary").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // One of the predefined categories
  date: timestamp("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location").notNull(),
  capacity: integer("capacity").notNull(),
  instructor: text("instructor").notNull(),
  instructorTitle: text("instructor_title").notNull(),
  instructorBio: text("instructor_bio").notNull(),
  instructorImageUrl: text("instructor_image_url").notNull(),
  learningPoints: text("learning_points").array(),
  requirements: text("requirements").array(),
  status: text("status").notNull().default('upcoming'), // 'upcoming', 'past', 'draft'
});

export const insertWorkshopSchema = createInsertSchema(workshops).omit({
  id: true,
}).extend({
  category: z.enum(CATEGORIES),
  status: z.enum(['upcoming', 'past', 'draft']).default('upcoming'),
});

export type InsertWorkshop = z.infer<typeof insertWorkshopSchema>;
export type Workshop = typeof workshops.$inferSelect;

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  workshopId: integer("workshop_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  occupation: text("occupation").notNull(),
  experienceLevel: text("experience_level").notNull(), // 'beginner', 'intermediate', 'advanced'
  expectations: text("expectations"),
  registeredAt: timestamp("registered_at").notNull().defaultNow(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  registeredAt: true,
}).extend({
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  email: z.string().email(),
  phone: z.string().optional(),
  expectations: z.string().optional(),
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;
