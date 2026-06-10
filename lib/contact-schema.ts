import { z } from "zod";

// Client schema — captchaToken optional because it's filled AFTER modal
export const contactSchema = z.object({
  firstName:    z.string().min(2, "First name is too short").max(50),
  lastName:     z.string().min(2, "Last name is too short").max(50),
  email:        z.string().email("Enter a valid email address"),
  message:      z.string().min(10, "Message is too short").max(2000),
  captchaToken: z.string().optional(),
});

// Server schema — captchaToken strictly required
export const serverContactSchema = contactSchema.extend({
  captchaToken: z.string().min(1),
});

export type ContactFormData = z.infer<typeof contactSchema>;