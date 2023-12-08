'use client';
import { Pencil, Delete } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ButtonActionProps {
  id: string | undefined;
}

const ButtonAction = ({ id }: ButtonActionProps) => {
  const router = useRouter();
  // como se va a borrar algo de la db se usa el useMutation de tantstack
  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
  });
  return (
    <div>
      <Link href={`/edit/${id}`} className="btn mr-2">
        <Pencil /> Edit
      </Link>
      <button className="btn btn-error" onClick={() => deletePost()}>
        <Delete />
        Delete
      </button>
    </div>
  );
};

export default ButtonAction;
