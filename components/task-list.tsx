'use client';
import { ScrollArea } from './ui/scroll-area';
import useProjectTasks from '@/hooks/use-project-tasks';

export function TaskList({projectId}: {projectId: string}) {
    const { data, isLoading, error } = useProjectTasks(projectId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-2">
                <div className="flex flex-col gap-2">
                    {data?.map((t) => (
                        <div className='w-full p-2 rounded border' key={t.id}>
                            <h3 className="text-lg font-bold">{t.title}</h3>
                            <p className="text-sm font-mono">{t.id}</p>
                            <p className="text-sm">{t.description}</p>
                            <p className="text-sm">{t.status}</p>
                            <p className="text-sm">{t.due_date}</p>

                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
