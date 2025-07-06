import { messagesRouter } from '@/procedures/message';
import { projectRouter } from '@/procedures/project';
import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  projects: projectRouter,
  messages: messagesRouter,
});

export type AppRouter = typeof appRouter;
