'use client';
import { useQuery } from '@tanstack/react-query';

export default function useProjects() {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await fetch('/api/projects');
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json();
        },
    });
}
