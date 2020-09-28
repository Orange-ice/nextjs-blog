import {GetServerSideProps, NextPage} from 'next';
import React from 'react';
import {useForm} from '../../../hooks/useForm';
import axios from 'axios';
import {getDatabaseConnection} from '../../../lib/getDatebaseConnection';

type Props = {
  id:number;
  post:Post
}

const PostEdit:NextPage<Props> = (props)=>{
  const {post,id} = props
  const {form} = useForm({
    initFormData: {title: post.title, content: post.content},
    fields: [
      {label: '文章标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'}
    ],
    buttons: <div className="actions"><button type="submit">提交</button></div>,
    submit: {
      request: formData => axios.patch(`/api/v1/posts/${id}`, formData),
      success: () => {
        window.alert('提交成功');
        window.location.href = '/posts';
      }
    }
  });

  return (
    <div className="postNew">
      <h1>创建文章</h1>
      <div className="form-wrapper">
        {form}
      </div>

      <style jsx global>{`
        .form-wrapper{
          padding: 16px;
        }
        .postNew > h1{
          margin: 16px 16px 0;
          text-align: center;
        }
        .postNew .field-content textarea{
          height: 30em;
          resize: none;
        }
        .postNew .label-text{
          width: 5em;
          text-align: right;
          color: mediumblue;
          font-weight: bolder;
        }
        .postNew .actions{
          display: flex;
          flex-direction: row-reverse;
        }
        .postNew .actions button{
          width: 64px;
          height: 1.8em;
        }
      `}</style>
    </div>
  );
}


export default PostEdit

export const getServerSideProps:GetServerSideProps = async (context)=>{
  const {id} = context.params
  const connection = await getDatabaseConnection()
  const post = connection.manager.findOne('Post',id)

  return{
    props:{
      id:parseInt(id.toString()),
      post:JSON.parse(JSON.stringify(post))
    }
  }
}