// app/api/tasks/route.ts

export async function GET() {
    const res = await fetch('https://proto-takehome.onrender.com/tasks');
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req: Request) {
    const body = await req.json();
    const res = await fetch('https://proto-takehome.onrender.com/tasks', {
        method: 'POST',
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
