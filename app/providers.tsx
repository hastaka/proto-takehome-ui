'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
            <ClerkProvider>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </ClerkProvider>
        </ThemeProvider>
    );
}
