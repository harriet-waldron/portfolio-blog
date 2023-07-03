import React from 'react';
import Layout from '../components/Layout';



export const Index = (): JSX.Element => {
  return (
    <Layout>
      <h1>Home Page</h1>

      <a
        href="https://github.com/harriet-waldron/portfolio-blog"
        className="inline-block px-7 py-3 rounded-md text-antiquewhite dark:text-antiquewhite bg-blue-600 hover:bg-blue-700 hover:text-antiquewhite dark:hover:text-antiquewhite"
      >
        Get the source code!
      </a>


    </Layout>
  );
};



export default Index;
