import PostCard from '@/components/PostCard';
import { db } from './db';

// DUDA: un server component solo puede interactuar asi de rapido con una api creada aqui mismo en nextjs, eso lo tengo que probar con otra api que tenga como la de invitame.mx o la de kidden
// supongo que hacer funciones como que tu api te comprima imagnes y las suba a aws o te parsee un excele se llega a complicar un poco mas

// NOTE: se supone que aqui estamos usando un server component por eso podemos interacturar directo haciendo peticiones a la base de datos
// NOTE: se supone en los que son client components se debe usar ReactQuery
//NOTE: como esto viene directo del server se supone es muy rapido por eso no se necesita algo como un loading o algo asi

async function getPosts() {
  // esta query se hace con prisma , es lo que se supone te ahorra la interacccion con una REST API externa
  // ya trae por ejemplo una funcion de orderby, algo que hace muy sencillo ordenar , sin hacer transformaciones a los datos

  const response = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return response;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className=" grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
