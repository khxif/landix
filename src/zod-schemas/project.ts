import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  createdBy: z.string().min(1, 'CreatedBy is required'),
});
export type ProjectSchemaType = z.infer<typeof projectSchema>;
