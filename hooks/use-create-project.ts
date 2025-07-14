// hooks/use-create-project.ts

import { CreateProjectDTO } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProject: CreateProjectDTO) => {
            const res = await fetch(`/api/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });

            if (!res.ok) throw new Error('Failed to create project');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });
        },
    });
}
