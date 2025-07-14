// hooks/use-create-task.ts

import { CreateTaskDTO } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateTask(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newTask: CreateTaskDTO) => {
            const res = await fetch(`/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!res.ok) throw new Error('Failed to create task');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['project-tasks', projectId],
            });
        },
    });
}
