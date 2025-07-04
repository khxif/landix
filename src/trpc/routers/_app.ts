import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { projectRouter } from '@/procedures/project';

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(opts => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  projects: projectRouter,
});

export type AppRouter = typeof appRouter;
