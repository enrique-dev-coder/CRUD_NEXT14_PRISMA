'use client';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// types
import { FormInputPost } from '@/types';
// requests
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tag } from '@prisma/client';

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing?: boolean;
  initialValue?: FormInputPost;
}

const FormPost: FC<FormPostProps> = ({ submit, isEditing, initialValue }) => {
  // doc de useForm https://www.react-hook-form.com/get-started/#Applyvalidation

  // typar la respuestas del hook
  // con este hook tambien se le pueden dar vlaores iniciales al formulario, lo cual facilita mucho para cargar los edits
  // solo con que los valores traigan el mismo nombre que se puso en los register los initial value

  const { register, handleSubmit } = useForm<FormInputPost>({
    defaultValues: initialValue,
  });

  // esto se usa como una funcion que le pasas al useForm, para yo no hacer el usesatate, manejo de eventos individuales etc

  // fetch list tags

  // REVIEW usando este hook de la libreria se puede ahorrar todos los useState y useEffect para traer las queries y loa loading, solo se necesita la funcion de la llamada a la api

  // NOTE usando el tRCP aunque es mas pedo las respuestas ya te llegan tipadas, aqui se tiene que tipar la respuesta usando en este caso el mismo modelo de prisma como tipo

  // Por ejemplo aqui usando el isLoading nos evita mucho codigo de mandar un hook que te mande si esta cargando la data
  const { data: dataTags, isLoading } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await axios.get('/api/tags');
      return response.data;
    },
  });

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className=" flex flex-col  items-center   justify-center gap-5 mt-10"
    >
      <input
        {...register('title', { required: true })}
        type="text"
        placeholder="Post title..."
        className="input input-bordered w-full max-w-lg"
      />
      <textarea
        {...register('content', { required: true })}
        className="textarea textarea-bordered w-full max-w-lg"
        placeholder="Post content..."
      ></textarea>
      <select
        {...register('tag', { required: true })}
        className="select select-bordered w-full max-w-lg"
      >
        <option disabled selected>
          Select Tags
        </option>
        {isLoading
          ? 'loading...'
          : dataTags?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
      </select>
      <button type="submit" className="btn btn-primary w-full max-w-lg">
        {isEditing ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default FormPost;
