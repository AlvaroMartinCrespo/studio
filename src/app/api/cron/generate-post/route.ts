import { NextRequest, NextResponse } from 'next/server';
import { generateAndPublishPost } from '@/lib/ai/generate-post';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // sin CRON_SECRET configurado, no se permite ejecutar
  const authHeader = req.headers.get('authorization');
  return authHeader === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const post = await generateAndPublishPost();
    return NextResponse.json({
      ok: true,
      post: { slug: post.slug, title: post.title, tags: post.tags },
    });
  } catch (error) {
    console.error('Error generando el post automático:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
