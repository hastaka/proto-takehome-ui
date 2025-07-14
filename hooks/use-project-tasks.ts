// hooks/use-project-tasks.ts

'use client';
import { Task } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export default function useProjectTasks(id: string) {
    return useQuery<Task[], Error>({
        queryKey: ['project-tasks', id],
        queryFn: async () => {
            const res = await fetch(`/api/projects/${id}/tasks`);
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json();
        },
    });
}
