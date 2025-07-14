// hooks/use-projects.ts

'use client';
import { Project } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export default function useProjects() {
    return useQuery<Project[], Error>({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('/api/projects');
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json();
        },
    });
}
