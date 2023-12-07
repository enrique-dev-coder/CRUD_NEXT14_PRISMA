'use client';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// types
import { FormInputPost } from '@/types';

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing?: boolean;
}

const FormPost: FC<FormPostProps> = ({ submit, isEditing }) => {
  // doc de useForm https://www.react-hook-form.com/get-started/#Applyvalidation

  // typar la respuestas del hook
  const { register, handleSubmit } = useForm<FormInputPost>();

  // esto se usa como una funcion que le pasas al useForm, para yo no hacer el usesatate, manejo de eventos individuales etc

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
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
      <button type="submit" className="btn btn-primary w-full max-w-lg">
        {isEditing ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default FormPost;
