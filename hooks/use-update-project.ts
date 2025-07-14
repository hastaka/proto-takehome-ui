// hooks/use-update-project.ts

import { UpdateProjectDTO } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ projectId, changes }: { projectId: string; changes: UpdateProjectDTO }) => {
            const res = await fetch(`/api/projects/${projectId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changes),
            });

            if (!res.ok) throw new Error('Failed to update project');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });
        },
    });
}
