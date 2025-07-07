import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { CrownIcon } from 'lucide-react';
import Image from 'next/image';
import { UserButton } from '../core/user-button';

export async function Header() {
  const session = await auth();

  return (
    <header className="px-6 py-5 flex items-center justify-between md:px-8">
      <span className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={50} height={50} className="size-10" />
        <h1 className="text-xl font-medium">Landfix</h1>
      </span>

      <div className="flex items-center gap-4">
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500
         text-white via-indigo-600 to-violet-600 hover:bg-blue-600"
        >
          <CrownIcon className="size-5 font-medium" />
          Premium
        </Button>

        <UserButton session={session} />
      </div>
    </header>
  );
}
