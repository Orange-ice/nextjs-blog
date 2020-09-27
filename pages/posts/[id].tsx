import React from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatebaseConnection';
import {Post} from '../../src/entity/Post';
import marked from 'marked';
import withSession from '../../lib/withSession';
import Link from 'next/link';

type Props = {
  post: Post,
  currentUser: User | null
}
const postsShow: NextPage<Props> = (props) => {
  const {post,currentUser} = props;
  return (
    <>
      <div className="wrapper">
        <header>
          <h1>{post.title}</h1>
          {currentUser &&
          <p>
            <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
          </p>
          }
        </header>

        <article className="markdown-body" dangerouslySetInnerHTML={ {__html: marked(post.content)} }>
        </article>
      </div>

      <style jsx>{`
        .wrapper{
          max-width: 800px;
          margin: 16px auto;
          padding: 0 16px;
        }
        h1{
          padding-bottom: 16px;
          border-bottom: solid 1px #ccc;
        }
        header > p{
          margin-top: 8px;
        }
        article{
          margin-top: 8px;
        }
      `}</style>
    </>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(async (context:GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne('Post', context.params.id);
  const currentUser = (context.req as any).session.get('currentUser') || null
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      currentUser
    }
  };
});
