import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Minimal API stubs to satisfy Next.js module requirements
// TODO: Implement real booking CRUD
export async function GET() {
	return NextResponse.json([]);
}

export async function POST(req: Request) {
	try {
		const json = await req.json();
		// Accept payload for now but do not persist
		return NextResponse.json({ ok: true, received: json }, { status: 201 });
	} catch {
		return NextResponse.json({ error: 'Ogiltig begäran' }, { status: 400 });
	}
}
