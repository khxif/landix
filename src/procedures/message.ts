import { inngest } from '@/inngest/client';
import { Project } from '@/models/Project';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { TRPCError } from '@trpc/server';
import z from 'zod';

export const messagesRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const project = await Project.findById(input.projectId);
      if (!project) throw new TRPCError({ message: 'Project not found', code: 'NOT_FOUND' });

      return project.messages as Message[];
    }),
  send: baseProcedure
    .input(
      z.object({
        text: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const project = await Project.findById(input.projectId);
      if (!project) throw new TRPCError({ message: 'Project not found', code: 'NOT_FOUND' });

      project.messages.push({
        content: input.text,
        role: 'user',
      });

      await project.save();

      await inngest.send({
        name: 'code/generate-code',
        data: {
          prompt: input.text,
          projectId: input.projectId,
        },
      });
    }),
});
