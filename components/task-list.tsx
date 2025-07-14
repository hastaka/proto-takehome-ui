'use client';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import useProjectTasks from '@/hooks/use-project-tasks';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const badgeMap: Record<string, 'outline' | 'destructive' | 'default'> = {
    todo: 'destructive',
    in_progress: 'outline',
    done: 'default',
};

export function TaskList({ projectId }: { projectId: string }) {
    const { data, isLoading, error } = useProjectTasks(projectId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-2">
                <div className="flex flex-col gap-2">
                    {data?.map((t) => (
                        <div className="w-full p-2 rounded border flex flex-col gap-1" key={t.id}>
                            <div className="flex gap-5 items-center">
                                <h3 className="text-lg font-bold">{t.title}</h3>
                                <Badge className="text-sm font-bold" variant={badgeMap[t.status]}>
                                    {t.status.toUpperCase()}
                                </Badge>
                                <p className="text-sm">{t.due_date || '(no due date)'}</p>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="ml-auto" size="icon">
                                    <MoreHorizontal />
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side='left' align='start'>
                                    <DropdownMenuLabel className='text-muted-foreground text-xs'>Status</DropdownMenuLabel>
                                    <DropdownMenuRadioGroup value={t.status}>
                                        <DropdownMenuRadioItem value="todo">Todo</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="in_progress">In Progress</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="done">Done</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem variant='destructive' onClick={() => console.log('delete') }>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <p className="text-xs font-mono text-muted-foreground">{t.id}</p>
                            <Separator />
                            <p className="text-sm p-1">{t.description || 'No description'}</p>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
