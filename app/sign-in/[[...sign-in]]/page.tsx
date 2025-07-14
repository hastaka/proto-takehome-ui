// app/sign-in/[[...sign-in]]/page.tsx

import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <main className="flex h-full items-center justify-center p-8 sm:p-20">
            <SignIn />
        </main>
    );
}
