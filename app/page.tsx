// app/page.tsx

"use client";

import { ProjectList } from "@/components/project-list";
import { TaskList } from "@/components/task-list";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuspendedProjectList() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("p");

  return <ProjectList currentProjectId={projectId || undefined} />;
}

function SuspendedTaskList() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("p");

  return projectId ? (
    <TaskList projectId={projectId} />
  ) : (
    <div className="w-full h-full italic flex items-center justify-center">
      Select a project
    </div>
  );
}

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-2 p-8 sm:p-20">
      <div className="flex justify-between items-center w-full p-4 bg-background/80 rounded border">
        <h1 className="text-xl sm:text-4xl text-foreground font-bold">
          Proto Takehome UI
        </h1>
        <UserButton />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full grow overflow-hidden">
        <section className="flex flex-col sm:w-1/3 h-1/3 sm:h-full bg-background/80 rounded border p-4 gap-2">
          <h2 className="text-2xl text-[#00b4db] font-bold">Projects</h2>
          <Suspense
            fallback={
              <div className="w-full h-full italic flex items-center justify-center">
                <Alert className="w-auto">
                  <Loader className="animate-spin" />
                  <AlertTitle>Loading projects...</AlertTitle>
                </Alert>
              </div>
            }
          >
            <SuspendedProjectList />
          </Suspense>
        </section>
        <section className="flex flex-col flex-1 h-[calc(calc(2/3_*_100%)_-_0.5rem)] sm:h-full bg-background/80 rounded border p-4 gap-2">
          <h2 className="text-2xl text-[#00b4db] font-bold">Tasks</h2>
          <Suspense
            fallback={
              <div className="w-full h-full italic flex items-center justify-center">
                <Alert className="w-auto">
                  <Loader className="animate-spin" />
                  <AlertTitle>Loading tasks...</AlertTitle>
                </Alert>
              </div>
            }
          >
            <SuspendedTaskList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
