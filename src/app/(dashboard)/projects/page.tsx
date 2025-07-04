import { auth } from '@/auth';
import { ProjectView } from '@/components/views/project-view';

export default async function Projects() {
  const session = await auth();

  return <ProjectView userId={session?.user?.id as string} />;
}
