import {NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';
import Link from 'next/link';

const PostsNew: NextPage = () => {
  const {form} = useForm({
    initFormData: {title: '', content: ''},
    fields: [
      {label: '文章标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'}
    ],
    buttons: <div className="actions"><button type="submit">提交</button></div>,
    submit: {
      request: formData => axios.post(`/api/v1/posts`, formData),
      success: () => {
        window.alert('提交成功');
        window.location.href = '/posts';
      }
    }
  });

  return (
    <div className="postNew">
      <header>
        <Link href="/posts"><a>返回文章列表</a></Link>
        <h1>创建文章</h1>
      </header>
      <div className="form-wrapper">
        {form}
      </div>

      <style jsx global>{`
        .postNew{
          padding-top: 8px;
        }
        .form-wrapper{
          padding: 16px;
        }
        .postNew  header > a{
          font-weight: bolder;
          color: mediumvioletred;
          margin-left: 16px;
          display: inline-block;
        }
        .postNew  header > a:hover{
          color: blueviolet;
        }
        .postNew  header > h1{
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
};

export default PostsNew;