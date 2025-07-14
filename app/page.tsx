'use client';

import { ProjectDetails } from '@/components/project-details';
import { ProjectList } from '@/components/project-list';
import { TaskList } from '@/components/task-list';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

export default function Home() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get('p');
    return (
        <main className="h-full flex flex-col items-center justify-center gap-2">
            <div className="flex justify-between items-center w-full p-4 bg-background/80 rounded border">
                <h1 className="text-4xl text-foreground font-bold">Proto Takehome UI</h1>
                <UserButton />
            </div>
            <div className="flex gap-2 w-full h-full">
                <section className="flex flex-col w-1/3 h-full bg-background/80 rounded border p-4 gap-2">
                    <h2 className="text-2xl text-[#00b4db] font-bold">Projects</h2>
                    <ProjectList />
                </section>
                <div className="flex flex-col flex-1 h-full">
                    <section className={cn("flex flex-col bg-background/80 rounded border p-4 gap-2 transition-all", projectId ? "min-h-0 mb-2" : "min-h-full mb-0")}>
                        <h2 className="text-2xl text-[#00b4db] font-bold">Project Details</h2>
                        {projectId ? (
                            <ProjectDetails projectId={projectId} key={projectId} />
                        ) : (
                            <span className="w-full h-full flex items-center justify-center">Select a project</span>
                        )}
                    </section>
                    <section className={cn("overflow-hidden flex-1")}>
                    <div className="flex flex-col bg-background/80 rounded border gap-2 p-4 h-full">
                        <h2 className="text-2xl text-[#00b4db] font-bold">Tasks</h2>
                        {projectId && <TaskList projectId={projectId} />}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
