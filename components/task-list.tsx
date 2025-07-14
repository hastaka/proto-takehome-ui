'use client';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import useProjectTasks from '@/hooks/use-project-tasks';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useDeleteTask } from '@/hooks/use-delete-task';
import { cn } from '@/lib/utils';
import { useUpdateTask } from '@/hooks/use-update-task';
import { Task } from '@/lib/types';
import { Dialog, DialogTrigger } from './ui/dialog';
import { EditTaskDialog } from './edit-task-dialog';
import { useState } from 'react';

const badgeMap: Record<string, 'destructive' | 'default' | 'secondary'> = {
    todo: 'destructive',
    in_progress: 'default',
    done: 'secondary',
};

const statusOrder = ['todo', 'in_progress', 'done'];

function taskSort(t1:Task, t2:Task) {
    const t1Index = statusOrder.indexOf(t1.status);
    const t2Index = statusOrder.indexOf(t2.status);
    if (t1Index < t2Index) return -1;
    if (t1Index > t2Index) return 1;
    const dateComparison = new Date(t1.created_at).getTime() - new Date(t2.created_at).getTime();
    return dateComparison;
}

export function TaskList({ projectId }: { projectId: string }) {
    const { data, isLoading, error } = useProjectTasks(projectId);
    const deleteTask = useDeleteTask(projectId);
    const updateTask = useUpdateTask(projectId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-2">
                <div className="flex flex-col gap-2">
                    {data?.sort((t1, t2) => taskSort(t1, t2)).map((t) => (
                        <div className="w-full p-2 rounded border flex flex-col gap-1" key={t.id}>
                            <div className="flex gap-5 items-center">
                                <h3 className="text-lg font-bold">{t.title}</h3>
                                <Badge className={cn('text-sm font-bold', t.status === 'done' ? 'bg-green-700' : '')} variant={badgeMap[t.status]}>
                                    {t.status.toUpperCase().replace('_', ' ')}
                                </Badge>
                                {t.due_date ? (
                                    <p className="text-sm">{new Date(t.due_date).toLocaleDateString()}</p>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">(no due date)</p>
                                )}
                                <Dialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="ml-auto" size="icon">
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="left" align="start">
                                        <DropdownMenuLabel className="text-muted-foreground text-xs">Status</DropdownMenuLabel>
                                        <DropdownMenuRadioGroup value={t.status} onValueChange={(value) => updateTask.mutate({taskId: t.id, changes: { status: value as "done" | "todo" | "in_progress" }})}>
                                            <DropdownMenuRadioItem value="todo">Todo</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="in_progress">In Progress</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="done">Done</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                        <DropdownMenuSeparator />
                                        <DialogTrigger asChild>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        </DialogTrigger>
                                        <DropdownMenuItem
                                            variant="destructive"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                deleteTask.mutate(t.id);
                                            }}
                                            disabled={deleteTask.isPending}
                                        >
                                            {deleteTask.isPending ? 'Deleting...' : 'Delete'}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <EditTaskDialog taskId={t.id} projectId={projectId} />
                                </Dialog>
                            </div>
                            <p className="text-xs font-mono text-muted-foreground">{t.id}</p>
                            <Separator />
                            {t.description ? (
                                <p className="text-sm p-1">{t.description}</p>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">No description.</p>
                            )}
                        </div>
                    ))}
                    <Dialog><DialogTrigger asChild><Button className="w-full h-16" variant="outline">Create task</Button></DialogTrigger><EditTaskDialog create projectId={projectId} /></Dialog>
                </div>
            </ScrollArea>
        </div>
    );
}
