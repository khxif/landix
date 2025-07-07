'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOutIcon } from 'lucide-react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

export function UserButton({ session }: { session: Session | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-11">
          <AvatarImage src={session?.user?.image ?? ''} />
          <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 md:w-56">
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center justify-between p-3"
        >
          <p>Logout</p>
          <LogOutIcon className="size-5 text-red-700" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
