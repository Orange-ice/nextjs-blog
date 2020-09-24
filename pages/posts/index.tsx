import {GetServerSideProps, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import React from 'react';
import {getDatabaseConnection} from 'lib/getDatebaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring';
import {usePager} from '../../hooks/usePager';

type Props = {
  posts: Post[],
  count: number,
  perPage: number,
  page: number,
  totalPage:number
}
const PostsIndex: NextPage<Props> = (props) => {
  const {posts,count,page,totalPage} = props;
  const {pager} = usePager({page,totalPage})
  return (
    <div>
      <h1>文章列表(总文章数{props.count} 每页{props.perPage})</h1>
      {posts.map(post =>
        <div>
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a>
              {post.title}
            </a>
          </Link>
        </div>
      )}
      <footer>
        {pager}
      </footer>
    </div>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const index = context.req.url.indexOf('?');
  const search = context.req.url.substr(index + 1);
  const query = qs.parse(search);
  const page = parseInt(query.page?.toString()) || 1;
  const connection = await getDatabaseConnection();
  const perPage = 1;
  const [posts, count] = await connection.manager.findAndCount(Post,
    {skip: (page - 1) * perPage, take: perPage});
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts)),
      count,
      perPage,
      page,
      totalPage:Math.ceil(count / perPage)
    }
  };
};
