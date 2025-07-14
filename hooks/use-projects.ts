'use client';
import { Project, Task } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

type ProjectResponse = Project & {
  tasks: Task[];
};

export function useProjects() {
    return useQuery<ProjectResponse[], Error>({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('/api/projects');
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json();
        },
    });
}

export function useProjectTasks(id: string) {
    return useQuery<Task[], Error>({
        queryKey: ['projects', id],
        queryFn: async () => {
            const res = await fetch(`/api/projects/${id}/tasks`);
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json();
        },
    });
}
