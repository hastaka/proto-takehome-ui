import { Project } from '@/lib/types';
import { Button } from './ui/button';
import Link from 'next/link';
import useProjectTasks from '@/hooks/use-project-tasks';
import { Skeleton } from './ui/skeleton';
import { Dialog, DialogTrigger } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useDeleteProject } from '@/hooks/use-delete-project';
import { EditProjectDialog } from './edit-project-dialog';
import { Separator } from './ui/separator';

export default function ProjectListItem({ active, project }: { active: boolean; project: Project }) {
    const { data, isLoading, error } = useProjectTasks(project.id);
    const deleteProject = useDeleteProject();

    if (isLoading) return <Skeleton className="h-16 border-1 w-full" />;
    if (error) return <div className="h-16 border-1 w-full flex items-center justify-center font-mono">Error loading project {project.id}</div>;

    return (
        <Button asChild variant={active ? 'default' : 'outline'} className="h-auto border-1">
            <Link href={`/?p=${project.id}`}>
                <div className="flex flex-col w-full items-start">
                    <div className="flex items-center gap-2 h-8 w-full">
                        <span className="text-lg">{project.name}</span>
                    <span className="text-sm font-mono text-muted-foreground">
                        {data?.filter((t) => t.status === 'done').length}/{data?.length}
                    </span>
                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ml-auto" size="icon">
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start">
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                    </DialogTrigger>
                                    <DropdownMenuItem
                                        variant="destructive"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            deleteProject.mutate(project.id);
                                        }}
                                        disabled={deleteProject.isPending}
                                    >
                                        {deleteProject.isPending ? 'Deleting...' : 'Delete'}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <EditProjectDialog projectId={project.id} />
                        </Dialog>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground">{project.id}</p>
                            <Separator className='my-2' />
                            {project.description ? (
                                <p className="text-sm p-1">{project.description}</p>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">No description.</p>
                            )}
                </div>
            </Link>
        </Button>
    );
}
