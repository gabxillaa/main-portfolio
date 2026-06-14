import { z } from "zod";

// Client schema — captchaToken optional because it's filled AFTER modal
export const contactSchema = z.object({
  firstName:    z.string().max(50).optional(),
  lastName:     z.string().max(50).optional(),
  email:        z.string().email("Enter a valid email address"),
  message:      z.string().min(10, "Message is too short").max(2000),
  captchaToken: z.string().optional(),
});

// Server schema — captchaToken strictly required
export const serverContactSchema = contactSchema.extend({
  captchaToken: z.string().min(1),
});

export type ContactFormData = z.infer<typeof contactSchema>;