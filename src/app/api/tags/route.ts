//NOTE se supone que aqui estas creand un tipo de endpoint que se llama api/tags que interactue con la base de datos
// la base de datos es un cliente de prisma que se creo en ese directorio

// REVIEW la verdad es que no estoy muy seguro si esto es mejor que una rest api, sobre todo cuando ya tienes creada la rest api

import { db } from '@/app/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tags = await db.tag.findMany();
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'could not get tags' },
      { status: 200 }
    );
  }
}
