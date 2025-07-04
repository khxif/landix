'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export default function Home() {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.projects.getAll.queryOptions());
  console.log(data);

  return <div>{'ygu'}</div>;
}
