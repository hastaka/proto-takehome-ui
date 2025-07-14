'use client';
import useProject from '@/hooks/use-project';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export function ProjectDetails({ projectId }: { projectId: string }) {
    const { data, isLoading, error } = useProject(projectId);

    if (isLoading || !data) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div className="flex-1 overflow-hidden grid grid-cols-4 gap-2">
            <div className="grid w-full items-center gap-2">
                <Label className="font-bold" htmlFor="id">
                    ID
                </Label>
                <Input readOnly id="id" placeholder="ID" defaultValue={data.id} />
            </div>
            <div className="grid w-full items-center gap-2">
                <Label className="font-bold" htmlFor="name">
                    Name
                </Label>
                <Input id="name" placeholder="Name" defaultValue={data.name} />
            </div>
            <div className="grid w-full items-center gap-2">
                <Label className="font-bold" htmlFor="id">
                    Created At
                </Label>
                <Input readOnly id="created_at" placeholder="Created At" defaultValue={data.created_at} />
            </div>
            <div className="grid w-full items-center gap-2">
                <Label className="font-bold" htmlFor="updated_at">
                    Updated At
                </Label>
                <Input readOnly id="updated_at" placeholder="Updated At" defaultValue={data.updated_at} />
            </div>
            <div className="grid col-span-4 items-center gap-2">
                <Label className="font-bold" htmlFor="description">
                    Description
                </Label>
                <Textarea id="description" placeholder="Description" defaultValue={data.description} className="resize-none" />
            </div>
            <div className="col-span-4 flex justify-end">
                <Button>Save</Button>
            </div>
        </div>
    );
}
