import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2, "First name is too short").max(50),
  lastName:  z.string().max(50).optional(),
  email:     z.string().email("Enter a valid email address"),
  message:   z.string().min(10, "Message is too short").max(2000),
});

export const serverContactSchema = contactSchema;
export type ContactFormData = z.infer<typeof contactSchema>;