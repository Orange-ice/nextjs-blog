import {GetServerSideProps, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import React, {useEffect, useState} from 'react';
import {getDatabaseConnection} from '../lib/getDatebaseConnection';
import {Post} from '../src/entity/Post';
import Link from 'next/link';

type Props = {
  posts:Post[]
}
const index: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post =>
        <Link key={post.id} href={`/posts/${post.id}`}>
          <a>
            {post.title}
          </a>
        </Link>
      )}
    </div>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  const posts= await connection.manager.find(Post)
  // console.log(posts);


  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts:JSON.parse(JSON.stringify(posts))
    }
  };
};
