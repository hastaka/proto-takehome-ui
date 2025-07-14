import { Project } from '@/lib/types';
import { Button } from './ui/button';
import Link from 'next/link';
import { useProjectTasks } from '@/hooks/use-projects';
import { Skeleton } from './ui/skeleton';

export default function ProjectListItem({ active, project }: { active:boolean; project: Project }) {
    const { data, isLoading, error } = useProjectTasks(project.id);
    if (isLoading) return <Skeleton className="h-16 border-1 w-full"/>;
    if (error) return <div className="h-16 border-1 w-full flex items-center justify-center font-mono">Error loading project {project.id}</div>;

    return (
        <Button asChild variant={active ? 'default' : 'outline'} className="h-auto border-1">
            <Link href={`/?p=${project.id}`}>
                <div className="flex flex-col w-full items-start">
                    <div className="flex items-center justify-between h-8 w-full">
                        <span className="text-lg">{project.name}</span>
                        <span>{data?.filter((t) => t.status === 'done').length}/{data?.length}</span>
                    </div>
                    <span className="text-sm min-h-4 italic">{project.description}</span>
                </div>
            </Link>
        </Button>
    );
}
