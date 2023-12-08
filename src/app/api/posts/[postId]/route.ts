import { db } from '@/app/db';
import { NextResponse } from 'next/server';

// aqui tambien se pueden obtener params de la url de la route
interface contextProps {
  params: {
    postId: string;
  };
}

export async function DELETE(req: Request, context: contextProps) {
  const { params } = context;
  // se accede como contest.params.[postId] o lo que este en el nombre de la carpeta con los  [ ]
  try {
    await db.post.delete({
      where: {
        id: params.postId,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

// esto es para el update
export async function PATCH(req: Request, context: contextProps) {
  const { params } = context;
  // body de la request
  const body = await req.json();
  // se accede como contest.params.[postId] o lo que este en el nombre de la carpeta con los  [ ]
  try {
    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
        tagId: body.tag.id,
      },
    });
    return NextResponse.json({ message: 'update success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(req: Request, context: contextProps) {
  const { params } = context;
  try {
    const singlePost = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      select: {
        title: true,
        content: true,
        tag: true,
      },
    });
    return NextResponse.json(singlePost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'could not get specific post' },
      { status: 200 }
    );
  }
}
