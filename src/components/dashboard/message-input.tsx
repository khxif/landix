'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useTRPC } from '@/trpc/client';
import { SendMessageSchemaType } from '@/zod-schemas/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ArrowUpIcon } from 'lucide-react';

interface MessageInputProps {
  id: string;
}

export function MessageInput({ id }: MessageInputProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(trpc.messages.send.mutationOptions());

  const form = useForm<SendMessageSchemaType>({
    defaultValues: {
      message: '',
    },
  });

  async function onSubmit(data: SendMessageSchemaType) {
    await mutateAsync({ text: data.message, projectId: id });
    queryClient.invalidateQueries({ queryKey: trpc.messages.getAll.queryKey() });

    form.reset();
  }
  return (
    <footer
      className="sticky left-0 bottom-0 flex flex-col border rounded-lg 
     px-2 py-4 space-y-2 w-full bg-inherit"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Generate a lading page for the company name..."
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded-full">
            <ArrowUpIcon />
          </Button>
        </form>
      </Form>
    </footer>
  );
}
