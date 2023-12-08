import { db } from '@/app/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // lo que mandas
    const body = await req.json();
    // crear con prisma
    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        tagId: body.tag,
      },
    });
    // regresar como respuesta el post que creaste
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
