'use client';
import FormPost from '@/components/FormPost';
import React from 'react';
import { FormInputPost } from '@/types';
import BackButton from '@/components/BackButton';

const CreatePage = () => {
  const handleCreatePost = (data: FormInputPost) => {
    console.log(data);
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
