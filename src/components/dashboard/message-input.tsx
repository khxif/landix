'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useTRPC } from '@/trpc/client';
import { SendMessageSchemaType } from '@/zod-schemas/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

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
    <footer className="sticky left-0 bottom-0 flex flex-col border p-2 space-y-2 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Enter a prompt..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </footer>
  );
}
