import Link from 'next/link';
import React from 'react';

const Navigation = (): JSX.Element => {
  return (
    <nav>
      <Link href="/">
        <a className="text-gray-900 dark:text-antiquewhite pr-6 py-4">Home</a>
      </Link>
      <Link href="/blog">
        <a className="text-gray-900 dark:text-antiquewhite px-6 py-4">Blog</a>
      </Link>
      <Link href="/tools">
        <a className="text-gray-900 dark:text-antiquewhite px-6 py-4">Tools</a>
      </Link>
      <Link href="/about">
        <a className="text-gray-900 dark:text-antiquewhite px-6 py-4">About</a>
      </Link>
    </nav>
  );
};

export default Navigation;
