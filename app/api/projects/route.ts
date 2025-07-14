export async function GET() {
    const res = await fetch('https://proto-takehome.onrender.com/projects');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req: Request) {
    const body = await req.json();
    const res = await fetch('https://proto-takehome.onrender.com/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}