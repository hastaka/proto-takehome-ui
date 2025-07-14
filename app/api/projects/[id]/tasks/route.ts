// app/api/projects/[id]/tasks/route.ts

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    const res = await fetch(`https://proto-takehome.onrender.com/projects/${id}/tasks`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
