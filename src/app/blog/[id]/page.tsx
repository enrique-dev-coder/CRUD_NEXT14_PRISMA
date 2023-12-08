import { db } from '@/app/db';
import ButtonAction from '@/components/ButtonAction';
import { FC } from 'react';

// la idea es desde el server hacer un fetch de la data de cada post
// obtener params d ela url y con eso hacer una query a la base de datos y traer lo correspondiente a ese post
// en nextjs por default en una page.tsx o .js puedes acceder a la prop de params del url
// el componente de la pagina lo tienes que hacer async, supongo que esto reemplaza a algo antiguo de next que era renderizar como props la data
interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

const getPosts = async (id: string) => {
  const response = await db.post.findFirst({
    // donde el id sea igul que el el que le mandes
    where: {
      id,
    },
    // datos que te trae
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
  });
  return response;
};

const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
  // con esto nos da la data del post
  const post = await getPosts(params.id);

  return (
    <div>
      <div className=" mb-8">
        <h2 className=" text-2xl font-bold my-4">{post?.title}</h2>
        <ButtonAction />
      </div>
      <span className="badge badge-neutral">{post?.tag.name}</span>
      <p className="text-slate-700">{post?.content}</p>
    </div>
  );
};

export default BlogDetailPage;
