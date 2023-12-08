import Link from 'next/link';
import React from 'react';
// prima te crea tipos uwu
import { Tag } from '@prisma/client';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    tag: Tag;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const { title, content, tag } = post;
  return (
    <div className="card w-full bg-base-100 shadow-xl botder ">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div className="card-actions justify-end">
          <span className="badge badge-neutral">{tag.name}</span>
          <Link href="/blog/1" className=" hover:underline">
            Read more ...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
