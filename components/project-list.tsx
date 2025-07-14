'use client';
import useProjects from '@/hooks/use-projects';
import { ScrollArea } from './ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import ProjectListItem from './project-list-item';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertOctagon, Loader } from 'lucide-react';
import { Dialog, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { EditProjectDialog } from './edit-project-dialog';

export function ProjectList() {
    const { data, isLoading, error } = useProjects();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('p');

    if (isLoading || !data)
        return (
            <div className="w-full h-full italic flex items-center justify-center">
                <Alert className="w-auto">
                    <Loader className="animate-spin" />
                    <AlertTitle>Loading projects...</AlertTitle>
                </Alert>
            </div>
        );
    if (error)
        return (
            <div className="w-full h-full italic flex items-center justify-center">
                <Alert variant="destructive" className="w-auto">
                    <AlertOctagon />
                    <AlertTitle>Error loading projects.</AlertTitle>
                    <AlertDescription>
                        {error.message + (error.message.endsWith('.') ? '' : '.') || 'Something went wrong.'}
                        <br />
                        Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );

    return (
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-2">
                <div className="flex flex-col gap-2">
                    {data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((p, index) => {
                        return <ProjectListItem key={index} active={p.id === projectId} project={p} />;
                    })}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full h-16 border-dashed italic" variant="outline">
                                Create project
                            </Button>
                        </DialogTrigger>
                        <EditProjectDialog create />
                    </Dialog>
                </div>
            </ScrollArea>
        </div>
    );
}
