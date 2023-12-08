'use client';
import BackButton from '@/components/BackButton';
import FormPost from '@/components/FormPost';
import { FormInputPost } from '@/types';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface EditPostPageProps {
  params: {
    id: string;
  };
}

const EditPostPage = ({ params }: EditPostPageProps) => {
  const { id } = params;
  const router = useRouter();
  // traer la data del post y que puedas ver lo que se va a editar
  const { data: dataFromPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await axios.get(`/api/posts/${id}`);
      return response.data;
    },
  });

  // peticion para editar el post
  // probar con isPending para las mutaciones
  const { mutate: editPost } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      // no tengo idea porque el update ahora la chaviza lo llama patch
      return axios.patch(`/api/posts/${id}`, newPost);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
  });

  const handleEditPost = (data: FormInputPost) => {
    editPost(data);
  };

  if (isLoadingPost) {
    return (
      <div className="text-center">
        <span className=" loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <BackButton />
      <h1 className=" text-2xl font-bold my-4 text-center">Edit Post</h1>
      <FormPost submit={handleEditPost} isEditing initialValue={dataFromPost} />
    </div>
  );
};

export default EditPostPage;
