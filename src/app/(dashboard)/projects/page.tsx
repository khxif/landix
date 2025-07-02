import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeXmlIcon } from 'lucide-react';
import Image from 'next/image';

export default function Projects() {
  return (
    <main className="max-w-7xl mx-auto py-8 flex flex-col space-y-8 px-5 md:px-0">
      <h1 className="text-2xl font-medium">Your Projects</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card>
          <CardContent className="flex flex-col space-y-4 items-center justify-center h-full">
            <Image
              src="/logo.svg"
              alt="Project Logo"
              width={70}
              height={70}
              className="size-12"
            />
            <h2 className='text-lg font-medium'>Create a New project.</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col space-y-10">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Project Name</CardTitle>
            </CardHeader>

            <CardFooter>
              <CodeXmlIcon className="size-6 text-primary" />
            </CardFooter>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
