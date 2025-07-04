'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ProjectSchemaType } from '@/zod-schemas/project';
import { UseFormReturn } from 'react-hook-form';

interface ProjectFormProps {
  form: UseFormReturn<ProjectSchemaType, unknown, ProjectSchemaType>;
  onSubmit: (values: ProjectSchemaType) => void;
}

export function ProjectsForm({ form, onSubmit }: ProjectFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col justify-center"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Project</Button>
      </form>
    </Form>
  );
}
