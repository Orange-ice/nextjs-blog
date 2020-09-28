import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import React from 'react';
import {getDatabaseConnection} from 'lib/getDatebaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring';
import {usePager} from '../../hooks/usePager';
import withSession from '../../lib/withSession';

type Props = {
  posts: Post[],
  count: number,
  perPage: number,
  page: number,
  totalPage: number,
  currentUser: User | null
}
const PostsIndex: NextPage<Props> = (props) => {
  const {currentUser, posts, count, page, totalPage} = props;
  const {pager} = usePager({page, totalPage});
  return (
    <>
      <div className="posts">
        <header>
          <h1>文章列表(总文章数{props.count} 每页{props.perPage})</h1>
          {currentUser && <Link href="/posts/new"><a>新增文章</a></Link>}
          {!currentUser &&
          <div className="links">
            <Link href="/sign_in"><a className="signIn">登录</a></Link>
            <Link href="/sign_up"><a>注册</a></Link>
          </div>}
        </header>
        {posts.map(post =>
          <div className="onePost" key={post.id}>
            <Link href={`/posts/${post.id}`}>
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

      <style jsx>{`
        .posts{
          max-width: 800px;
          margin: 0 auto;
          padding: 16px;
        }
        .onePost{
          border-bottom: 1px solid #ddd;
          padding: 8px 0;
        }
        .onePost > a{
          border-bottom: none;
          color: #000;
        }
        .onePost > a:hover{
          color:#00adb5
        }
        .posts > header{
          display: flex;
          align-items: center;
          font-weight: bold;
        }
        .posts > header > h1{
          margin-right: auto;
        }
        .posts header .links .signIn{
          margin-right: 16px;
        }
      `}</style>
    </>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  const index = context.req.url.indexOf('?');
  const search = context.req.url.substr(index + 1);
  const query = qs.parse(search);
  const page = parseInt(query.page?.toString()) || 1;
  const currentUser = (context.req as any).session.get('currentUser') || null;  // 传给前端根据是否登录展示不同页面
  const connection = await getDatabaseConnection();
  const perPage = 10;
  const [posts, count] = await connection.manager.findAndCount(Post,
    {skip: (page - 1) * perPage, take: perPage});
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      currentUser,
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts)),
      count,
      perPage,
      page,
      totalPage: Math.ceil(count / perPage)
    }
  };
});
