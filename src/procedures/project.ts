import { connectDb } from '@/lib/utils';
import { Project } from '@/models/Project';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { projectSchema } from '@/zod-schemas/project';
import { TRPCError } from '@trpc/server';

export const projectRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    await connectDb();

    const projects = await Project.find();
    return projects;
  }),
  
  create: baseProcedure.input(projectSchema).mutation(async ({ input }) => {
    await connectDb();

    const existingProject = await Project.findOne({ title: input.title });
    if (existingProject)
      throw new TRPCError({ message: 'Project with this title already exists', code: 'CONFLICT' });

    await Project.create({
      title: input.title,
      createdBy: input.createdBy,
    });

    return { message: 'Project created successfully' };
  }),
});
