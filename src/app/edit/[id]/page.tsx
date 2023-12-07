'use client';
import BackButton from '@/components/BackButton';
import FormPost from '@/components/FormPost';
import { FormInputPost } from '@/types';
import React from 'react';

const EditPostPage = () => {
  const handleEditPost = (data: FormInputPost) => {
    console.log(data);
  };

  return (
    <div>
      <BackButton />
      <h1 className=" text-2xl font-bold my-4 text-center">Edit Post</h1>
      <FormPost submit={handleEditPost} isEditing />
    </div>
  );
};

export default EditPostPage;
