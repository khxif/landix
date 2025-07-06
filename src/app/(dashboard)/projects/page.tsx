import { auth } from '@/auth';
import { Header } from '@/components/dashboard/header';
import { ProjectView } from '@/components/views/project-view';
import { redirect } from 'next/navigation';

export default async function Projects() {
  const session = await auth();
  if (!session || !session?.user) redirect('/login');

  return (
    <>
      <Header />
      <ProjectView userId={session?.user?.id as string} />
    </>
  );
}
