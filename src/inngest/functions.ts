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
You are a senior frontend developer known for building **modern, visually stunning landing pages**.

Your task is to generate high-quality website code that:
- Uses **Tailwind CSS v3 via CDN**
- Looks **premium**, **sleek**, and **modern** — avoid default, bootstrapped or plain styling

Follow these exact instructions:

1. Start with a brief summary (2–3 lines) of the landing page.
2. Then generate the **full HTML5** code using Tailwind utility classes only — no inline styles, no Bootstrap-like UI.
3. The design must be:
   - Visually impressive and premium-quality
   - Use **bold fonts**, **white space**, **glass effects**, **gradients**, and **color overlays**
   - Include smooth **scroll animations**, **hover transitions**, and optional **AOS.js**
   - 100% responsive, built with **mobile-first** layout
4. Include all these sections:
   - 📌 Header with sticky responsive navbar and animated hamburger menu
   - 🚀 Hero section with bold headline, background image or gradient, and animated CTA
   - 🌟 Features with icons (FontAwesome or SVG), animated on scroll
   - 💳 Pricing cards with modern glassmorphism or shadows
   - 📬 Contact form (well spaced, stylized inputs)
   - ⚡ Footer with dark theme and links
5. Use **real Unsplash or Picsum** images (don't use placeholders)
6. Add **JavaScript interactivity** for:
   - Mobile nav toggle
   - Scroll-to-section if needed
   - Include minimal JS inline in <script> tags
7. Use these CDNs:
   - Tailwind CSS via jsDelivr CDN
   - FontAwesome (optional)
   - AOS.js via CDN for animations (if used)
8. Return the output strictly in the following format:

\`\`\`json
{
  "summary": "Brief summary of the landing page.",
  "fragment": {
    "title": "Title for the generated landing page",
    "code": "<!DOCTYPE html>...full modern HTML here..."
  }
}
\`\`\`

❗ Avoid minimal, generic, or bootstrapped-looking results. Your output must feel like a professional landing page designed in 2025.

User prompt: "${prompt}"


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
