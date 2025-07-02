import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CrownIcon } from 'lucide-react';
import Image from 'next/image';

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

        <Popover>
          <PopoverTrigger asChild>
            <Avatar className='size-11'>
              <AvatarImage src={session?.user?.image ?? ''} />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" sideOffset={10}>
            uyjg
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
