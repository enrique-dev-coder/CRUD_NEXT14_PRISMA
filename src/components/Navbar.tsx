import React from 'react';
import Link from 'next/link';
import { BookOpenCheck } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-neutral-100">
      <div className="container ">
        <div className="navbar">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <Link href="/">
              <BookOpenCheck />
            </Link>
          </div>
          <div className="flex-none">
            <Link href="/create" className="btn  btn-ghost">
              Create Post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
