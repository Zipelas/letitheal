import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getErrInfo(err: unknown): { name?: string; message?: string } {
  const anyErr = err as { name?: string; message?: string };
  return { name: anyErr?.name, message: anyErr?.message };
}

export async function GET(req: NextRequest) {
  const vercelEnv = process.env.VERCEL_ENV;
  const mongoUriSet = !!process.env.MONGODB_URI;
  const url = new URL(req.url);
  const checkDb = url.searchParams.get('db') === '1';

  if (!checkDb) {
    return NextResponse.json({ ok: true, vercelEnv, mongoUriSet });
  }

  try {
    await dbConnect();
    return NextResponse.json({ ok: true, vercelEnv, mongoUriSet, db: 'connected' });
  } catch (e: unknown) {
    const { name, message } = getErrInfo(e);
    console.error('Health API DB connect error', { name, message });
    return NextResponse.json({ ok: false, vercelEnv, mongoUriSet, db: 'error' }, { status: 500 });
  }
}
