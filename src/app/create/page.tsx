'use client';
import FormPost from '@/components/FormPost';
import React from 'react';
import { FormInputPost } from '@/types';
import BackButton from '@/components/BackButton';
import { useRouter } from 'next/navigation';
// post request
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// NOTA GENERAL
// crear una api grande en la funcion de next se me hace medio castroso porque se tienen que acomodar muchas carpetas par alos endpoints

const CreatePage = () => {
  const router = useRouter();

  // hacer una post rquest con tanstasck react query
  // la logica es que es una mutacion a tu base de datos o eso supongo por eso el nombre
  const { mutate: createPost } = useMutation({
    mutationFn: (newPost: FormInputPost) => {
      // esa data es la que va a venir del form
      // REVIEW recordando este componente es de cliente entonces si tiene que hace runa llamada a la API
      return axios.post('/api/posts/create', newPost);
    },
    // ,manejar errores
    onError: (error) => {
      console.log(error);
    },
    // manejar cuando las cosas salen bien como un modal o algo asi, en vez de un .then todo feo
    // o por rjemplo refresh del router para traer la data o simplemente traer la data otra vez para mejorar experiencia de usario
    // asi puedes vitar por ejemplo el uso de redux para dar este efecto de como el live update
    // y como viene del server esta bien rapido
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
  });

  const handleCreatePost = (data: FormInputPost) => {
    createPost(data);
  };

  return (
    <div>
      <BackButton />
      <h1 className=" text-2xl font-bold my-4">Add new Post</h1>
      <FormPost submit={handleCreatePost} />
    </div>
  );
};

export default CreatePage;
