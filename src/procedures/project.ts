import { connectDb } from '@/lib/utils';
import { Project } from '@/models/Project';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { getProjectsSchema, projectSchema } from '@/zod-schemas/project';
import { TRPCError } from '@trpc/server';
import z from 'zod';

export const projectRouter = createTRPCRouter({
  getById: baseProcedure
    .input(
      getProjectsSchema.extend({
        projectId: z.string().min(1, 'Project ID is required'),
      }),
    )
    .query(async ({ input }) => {
      await connectDb();

      const [project] = await Project.find({ createdBy: input.userId, _id: input.projectId });
      return project;
    }),
  getAll: baseProcedure.input(getProjectsSchema).query(async ({ input }) => {
    await connectDb();

    const projects = await Project.find({ createdBy: input.userId });
    return projects;
  }),

  create: baseProcedure.input(projectSchema).mutation(async ({ input }) => {
    await connectDb();

    const existingProject = await Project.findOne({
      title: input.title,
      createdBy: input.createdBy,
    });
    if (existingProject)
      throw new TRPCError({ message: 'Project with this title already exists', code: 'CONFLICT' });

    await Project.create({
      title: input.title,
      createdBy: input.createdBy,
    });

    return { message: 'Project created successfully' };
  }),
});
