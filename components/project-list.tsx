'use client';
import useProjects from '@/hooks/use-projects';
import { ScrollArea } from './ui/scroll-area';

export function ProjectList() {
    const { data, isLoading, error } = useProjects();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-2">
                {data.map((item, index) => (
                    <li key={index}>{index}</li>
                ))}
            </ScrollArea>
        </div>
    );
}
