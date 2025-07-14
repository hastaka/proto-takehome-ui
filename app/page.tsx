'use client';

import { ProjectDetails } from '@/components/project-details';
import { ProjectList } from '@/components/project-list';
import { TaskList } from '@/components/task-list';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

export default function Home() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get('p');
    return (
        <main className="h-full flex flex-col items-center justify-center gap-2 p-8 sm:p-20">
            <div className="flex justify-between items-center w-full p-4 bg-background/80 rounded border">
                <h1 className="text-4xl text-foreground font-bold">Proto Takehome UI</h1>
                <UserButton />
            </div>
            <div className="flex gap-2 w-full h-full">
                <section className="flex flex-col w-1/3 h-full bg-background/80 rounded border p-4 gap-2">
                    <h2 className="text-2xl text-[#00b4db] font-bold">Projects</h2>
                    <ProjectList />
                </section>
                <Accordion type="single" className="flex flex-col flex-1 h-full gap-2">
                    <AccordionItem value="project-details" className="flex flex-col bg-background/80 rounded border p-4 gap-2">
                        <AccordionTrigger className="text-2xl text-[#00b4db] font-bold">Project Details</AccordionTrigger>
                        <AccordionContent>
                            {projectId ? (
                                <ProjectDetails projectId={projectId} key={projectId} />
                            ) : (
                                <span className="w-full h-full flex items-center justify-center">Select a project</span>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="tasks" className="flex flex-col bg-background/80 rounded border gap-2 p-4">
                        <AccordionTrigger className="text-2xl text-[#00b4db] font-bold">Tasks</AccordionTrigger>
                        <AccordionContent>{projectId && <TaskList projectId={projectId} />}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </main>
    );
}
