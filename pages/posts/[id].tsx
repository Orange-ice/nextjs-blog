import React, {useCallback} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatebaseConnection';
import {Post} from '../../src/entity/Post';
import marked from 'marked';
import withSession from '../../lib/withSession';
import Link from 'next/link';
import {useRouter} from 'next/router';
import axios from 'axios'

type Props = {
  id:number;
  post: Post;
  currentUser: User | null
}
const postsShow: NextPage<Props> = (props) => {
  const {post,currentUser,id} = props;
  const router =useRouter()
  const onRemove = useCallback(()=>{
    axios.delete(`/api/v1/posts/${id}`).then(()=>{
      window.alert('删除成功')
      router.push('/posts')
    },()=>{
      window.alert('删除失败')
    })
  },[id])
  return (
    <>
      <div className="wrapper">
        <header>
          <h1>{post.title}</h1>
          {currentUser &&
          <p className="actions">
            <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
            <button onClick={onRemove}>删除</button>
            <Link href="/posts" as={`/posts`}><a>文章列表</a></Link>
          </p>
          }
        </header>

        <article className="markdown-body" dangerouslySetInnerHTML={ {__html: marked(post.content)} }>
        </article>
      </div>

      <style jsx>{`
        .actions{
          font-weight: bold;
        }
        .actions  > button{
          border: none;
          background:none;
          color: indianred;
          margin-left: 16px;
          margin-right: 32px;
          cursor: pointer;
        }
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
  const id = context.params.id
  const post = await connection.manager.findOne('Post', id);
  const currentUser = (context.req as any).session.get('currentUser') || null
  return {
    props: {
      id:parseInt(id.toString()),
      post: JSON.parse(JSON.stringify(post)),
      currentUser
    }
  };
});
