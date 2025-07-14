// app/api/projects/[id]/route.ts

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    const res = await fetch(`https://proto-takehome.onrender.com/projects/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    const res = await fetch(`https://proto-takehome.onrender.com/projects/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    const body = await req.json();

    const res = await fetch(`https://proto-takehome.onrender.com/projects/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
