import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  createdBy: z.string().min(1, 'CreatedBy is required'),
});
export type ProjectSchemaType = z.infer<typeof projectSchema>;

export const getProjectsSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});
export type GetProjectsSchemaType = z.infer<typeof getProjectsSchema>;

export const sendMessageSchema = z.object({
  message: z.string().min(1, 'Message is required'),
});
export type SendMessageSchemaType = z.infer<typeof sendMessageSchema>;