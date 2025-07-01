'use client';

import { GoogleIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-svh bg-accent">
      <section className="flex-1 hidden items-center bg-gray-900 h-full text-white md:flex">
       <div className='flex flex-col space-y-4  ml-28'>
         <span className='flex items-center space-x-3'>
          <Image src="/logo.svg" alt="Logo" width={40} height={40} className="size-10" />
          <h2 className='font-medium text-2xl'>Landix</h2>
        </span>

        <p className='text-sm text-muted-foreground'>Build you own landing pages with a prompt.</p>
       </div>
      </section>

      <section className="flex-1 flex items-center justify-center">
        <Card className="max-w-sm w-full ">
          <CardContent className="flex flex-col space-y-6 justify-center text-center">
            <CardHeader>
              <CardTitle>Login to Continue</CardTitle>
            </CardHeader>
            <Button variant="outline" className="flex space-x-2">
              Continue with Google
              <GoogleIcon className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
