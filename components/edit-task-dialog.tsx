import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTask from '@/hooks/use-task';
import { Textarea } from './ui/textarea';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useUpdateTask } from '@/hooks/use-update-task';
import { useCreateTask } from '@/hooks/use-create-task';

interface EditTaskDialogProps {
    create?: boolean;
    taskId?: string;
    projectId: string;
}
export function EditTaskDialog({ create, taskId, projectId }: EditTaskDialogProps) {
    const { data, isLoading, error } = useTask(taskId);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dueDate, setDueDate] = useState<string|undefined>("");
    const updateTask = useUpdateTask(projectId);
    const createTask = useCreateTask(projectId);

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setDescription(data.description);
            setDueDate(data.due_date);
        }
    }, [data]);

    return (
        <DialogContent className="sm:max-w-[425px]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    document.getElementById('save')?.click();
                }}
            >
                <DialogHeader>
                    <DialogTitle>{create ? 'Create task' : 'Edit task'}</DialogTitle>
                    <DialogDescription>Enter the details of your task here. Click save when you&apos;re done.</DialogDescription>
                </DialogHeader>
                {error && <div>{error.message}</div>}
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid gap-2 my-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="font-bold">
                                Title
                            </Label>
                            <Input id="title" name="title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description" className="font-bold">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                className="resize-none"
                                defaultValue={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="due_date" className="font-bold">
                                Due Date
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="due_date"
                                    name="due_date"
                                    type="date"
                                    value={dueDate ? dueDate.split('T')[0] : ''}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={() => {
                                        setDueDate(undefined);
                                    }}
                                >
                                    <X />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            id="save"
                            onClick={(e) => {
                                if (create) createTask.mutate({ project_id: projectId, title:title != '' ? title : 'Untitled task', description, due_date: dueDate != '' ? dueDate : undefined, status: 'todo' });
                                if (taskId) updateTask.mutate({ taskId, changes: { title, description, due_date: dueDate ?? '' } });
                            }}
                        >
                            Save changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
