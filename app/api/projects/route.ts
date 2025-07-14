export async function GET() {
    const res = await fetch('https://proto-takehome.onrender.com/projects');
    const data = await res.json();
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}
