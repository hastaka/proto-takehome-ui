import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const res = await fetch(`https://proto-takehome.onrender.com/tasks/${id}`);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const res = await fetch(`https://proto-takehome.onrender.com/tasks/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const res = await fetch(`https://proto-takehome.onrender.com/tasks/${id}`, { method: 'PATCH', body: req.body });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
