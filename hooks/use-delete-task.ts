// hooks/use-delete-task.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteTask(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (taskId: string) => {
            const res = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete task');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['project-tasks', projectId],
            });
        },
    });
}
