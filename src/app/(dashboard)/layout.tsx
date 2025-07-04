import { auth } from '@/auth';
import { Header } from '@/components/dashboard/header';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || !session?.user) redirect('/login');

  return (
    <>
      <Header />
      {children}
    </>
  );
}
