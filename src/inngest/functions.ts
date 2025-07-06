import { Project } from '@/models/Project';
import { createAgent, gemini } from '@inngest/agent-kit';
import { TRPCError } from '@trpc/server';
import { inngest } from './client';

interface Response {
  content: string;
}

export const helloWorld = inngest.createFunction(
  { id: 'code-agent' },
  { event: 'code/generate-code' },

  async ({ event, step }) => {
    const codeWriterAgent = createAgent({
      name: 'Code writer',
      system: 'You are an expert web developer',
      model: gemini({ model: 'gemini-1.5-flash' }),
    });

    const { prompt, projectId } = event.data;

    const { output } = await codeWriterAgent.run(`
        Use the tools available to:
        1. Generate a summary of the landing page
        2. Generate the full HTML code

        Prompt: "${prompt}"
        Respond with the summary and the code in the following format:

        {
          "summary": "Your summary here",
          "fragment": {
            "title": "Title of the landing page",
            "code": "Full HTML code here"
          }
        }
`);
    const response = output[0];
    const outputText = JSON.parse(
      (response as Response).content.replace(/```(?:json)?\n?([\s\S]*?)```/, '$1'),
    );

    await step.run('save to Db', async () => {
      const project = await Project.findById(projectId);
      if (!project) throw new TRPCError({ message: 'Project not found', code: 'NOT_FOUND' });

      project.messages.push({
        content: outputText.summary,
        role: 'assistant',
        fragment: outputText.fragment,
      });

      await project.save();
    });

    return { outputText };
  },
);
