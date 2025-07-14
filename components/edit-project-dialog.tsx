// components/edit-project-dialog.tsx

import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import { useEffect, useState } from 'react';
import { useUpdateProject } from '@/hooks/use-update-project';
import { useCreateProject } from '@/hooks/use-create-project';
import useProject from '@/hooks/use-project';

interface EditProjectDialogProps {
    create?: boolean;
    projectId?: string;
}
export function EditProjectDialog({ create, projectId }: EditProjectDialogProps) {
    const { data, isLoading, error } = useProject(projectId);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const updateProject = useUpdateProject();
    const createProject = useCreateProject();

    useEffect(() => {
        if (data) {
            setName(data.name);
            setDescription(data.description);
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
                    <DialogTitle>{create ? 'Create project' : 'Edit project'}</DialogTitle>
                    <DialogDescription>Enter the details of your project here. Click save when you&apos;re done.</DialogDescription>
                </DialogHeader>
                {error && <div>{error.message}</div>}
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid gap-2 my-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="font-bold">
                                Name
                            </Label>
                            <Input id="name" name="name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
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
                                if (create) createProject.mutate({ name: name != '' ? name : 'Untitled project', description });
                                if (projectId) updateProject.mutate({ projectId, changes: { name, description } });
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
