// hooks/use-task.ts

'use client';
import { Task } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export default function useTask(id?: string) {
    return useQuery<Task, Error>({
        queryKey: ['task', id],
        queryFn: async () => {
            if (!id) return null;
            const res = await fetch(`/api/tasks/${id}`);
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json();
        },
    });
}
