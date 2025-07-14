'use client';
import useProjects from '@/hooks/use-projects';
import { ScrollArea } from './ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import ProjectListItem from './project-list-item';

export function ProjectList() {
    const { data, isLoading, error } = useProjects();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('p');

    if (isLoading || !data) return <div className='w-full h-full italic flex items-center justify-center'>Loading...</div>;
    if (error) return <div className='w-full h-full italic flex items-center justify-center'>Error loading projects!</div>;

    return (
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-2">
                <div className="flex flex-col gap-2">
                    {data.map((p, index) => {
                        return (
                            <ProjectListItem key={index} active={p.id === projectId} project={p} />
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
}
