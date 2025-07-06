'use client';

import { CodeHighlighter } from '@/components/dashboard/code-highlighter';
import { CodePreview } from '@/components/dashboard/code-preview';
import { MessageInput } from '@/components/dashboard/message-input';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { CopyIcon } from 'lucide-react';
import React, { use } from 'react';

export default function ProjectPreview({ params }: { params: Promise<{ id: string }> }) {
  const trpc = useTRPC();
  const { id } = use(params);

  const { data: messages } = useQuery(
    trpc.messages.getAll.queryOptions({ projectId: id }, { refetchInterval: 4000 }),
  );

  const [selectedFragment, setSelectedFragment] = React.useState<Fragment | null>(null);

  React.useEffect(() => {
    const latestWithFragment = messages
      ?.slice()
      .reverse()
      .find(m => m.fragment)?.fragment;
    if (latestWithFragment) {
      setSelectedFragment(latestWithFragment);
    }
  }, [messages]);

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={35} className="h-full flex flex-col p-2 relative">
        <div className="flex flex-col overflow-y-auto space-y-4 flex-1">
          {messages?.map(message => (
            <div
              key={message._id}
              className={cn(
                message.role === 'user'
                  ? 'bg-gray-100 ml-auto flex-row-reverse'
                  : 'flex flex-col space-y-4',
                'p-2 rounded-md',
              )}
            >
              <p> {message.content}</p>

              {message.fragment ? (
                <div
                  onClick={() => setSelectedFragment(message.fragment as Fragment)}
                  className={cn(
                    'px-4 py-6 rounded-md outline cursor-pointer',
                    selectedFragment?._id === message.fragment._id
                      ? 'bg-primary text-white'
                      : 'bg-gray-200',
                  )}
                >
                  <p>{message.fragment.title}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <MessageInput id={id} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={65} className="overflow-y-scroll h-full">
        <nav className="p-4 h-full">
          <Tabs defaultValue="demo" className="overflow-y-scroll h-full space-y-1">
            <TabsList>
              <TabsTrigger value="demo">Demo</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-4">
              <div className="p-2 px-4 border rounded-lg flex-1">
                <p>{`https://${id}.localhost:3000`}</p>
              </div>
              <Button variant="outline">
                <CopyIcon />
              </Button>
            </div>
            <TabsContent value="demo" className="h-full">
              <CodePreview code={selectedFragment?.code ?? ''} />
            </TabsContent>
            <TabsContent value="code">
              <CodeHighlighter code={selectedFragment?.code ?? ''} />
            </TabsContent>
          </Tabs>
        </nav>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
