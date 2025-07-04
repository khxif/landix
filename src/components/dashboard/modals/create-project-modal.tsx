'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTRPC } from '@/trpc/client';
import { projectSchema, ProjectSchemaType } from '@/zod-schemas/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ProjectsForm } from '../forms/projects-form';

interface CreateProjectModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userId: string;
}

export function CreateProjectModal({ isOpen, setIsOpen, userId }: CreateProjectModalProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: data => {
        console.log(data);
        setIsOpen(false);
        queryClient.invalidateQueries({
          queryKey: trpc.projects.getAll.queryKey(),
        });

        toast.success(data.message);
      },
      onError: error => {
        console.error('Error creating project:', error);
        toast.error(error.message || 'Failed to create project');
      },
    }),
  );

  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      createdBy: userId,
    },
  });

  async function handleSubmit(values: ProjectSchemaType) {
    await mutateAsync(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="absolute left-1/2 !-translate-x-1/2 w-full max-w-md 
        flex flex-col space-y-4"
      >
        <DialogHeader>
          <DialogTitle>Create New Project.</DialogTitle>
        </DialogHeader>

        <ProjectsForm form={form} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
