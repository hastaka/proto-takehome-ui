// app/layout.tsx

import type { Metadata } from 'next';
import { Manrope, Space_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const sans = Manrope({
    variable: '--font-sans',
    subsets: ['latin'],
});

const mono = Space_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
    weight: ['400'],
});

export const metadata: Metadata = {
    title: 'Proto Takehome UI',
    description: 'Proto Takehome UI',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${sans.variable} ${mono.variable} antialiased w-full h-screen bg-gradient-to-br from-[#00b4db] to-[#0083b0]`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
