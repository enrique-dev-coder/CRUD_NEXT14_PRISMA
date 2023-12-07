import { Pencil, Delete } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ButtonAction = () => {
  return (
    <div>
      <Link href="/edit/1" className="btn mr-2">
        <Pencil /> Edit
      </Link>
      <button className="btn btn-error">
        <Delete />
        Delete
      </button>
    </div>
  );
};

export default ButtonAction;
