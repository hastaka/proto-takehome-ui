// hooks/use-update-task.ts
import { UpdateTaskDTO } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, changes }: { taskId: string; changes: UpdateTaskDTO }) => {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      });

      if (!res.ok) throw new Error('Failed to update task');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['project-tasks', projectId],
      });
    },
  });
}
