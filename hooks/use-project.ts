'use client';
import { Project } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export default function useProject(id?: string) {
    return useQuery<Project, Error>({
        queryKey: ['project', id],
        queryFn: async () => {
            if (!id) return null;
            const res = await fetch(`/api/projects/${id}`);
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json();
        },
    });
}
