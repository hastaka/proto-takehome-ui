import { ProjectList } from '@/components/project-list';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
    return (
        <main className="h-full flex flex-col items-center justify-center">
            <div className="flex justify-between items-center w-full p-2">
                <h1 className="text-4xl text-foreground font-bold">Proto Takehome UI</h1>
                <UserButton />
            </div>
            <div className="flex gap-2 w-full h-full">
                <section className="flex flex-col w-1/3 h-full bg-background/80 rounded border p-4 gap-2">
                    <h2 className="text-2xl text-[#00b4db] font-bold">Projects</h2>
                    <ProjectList />
                </section>
                <section className="flex flex-col flex-1 h-full bg-background/80 rounded border p-4 gap-2">
                    <h2 className="text-2xl text-[#00b4db] font-bold">Tasks</h2>
                </section>
            </div>
        </main>
    );
}
