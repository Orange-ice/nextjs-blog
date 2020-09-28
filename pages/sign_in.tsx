import {GetServerSideProps, GetServerSidePropsContext, NextApiRequest, NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import withSession from '../lib/withSession';
import {User} from '../src/entity/User';
import {ParsedUrlQuery} from 'querystring';
import {useForm} from '../hooks/useForm';
import qs from 'querystring';
import {useRouter} from 'next/router';
import Link from 'next/link';

const SignIn: NextPage<{ user: User }> = (props) => {
  const router = useRouter();
  const {form} = useForm({
    initFormData: {username: '', password: ''},
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'}
    ],
    buttons: <div className="actions">
      <button type="submit">登录</button>
    </div>,
    submit: {
      request: formData => axios.post(`/api/v1/sessions`, formData),
      success: () => {
        window.alert('登录成功');
        const query = qs.parse(window.location.search.substr(1));
        if (query.returnTo) {
          window.location.href = query.returnTo.toString();
        } else {
          router.push('/posts');
        }
      }
    }
  });

  return (
    <>
      <div className="signIn">

        <img src="/signInHeader.png" alt=""/>

        {props.user &&
        <p>
          当前登录用户为{props.user.username}
        </p>
        }
        <h1>登录</h1>

        <div className="formWrapper">
          {form}
        </div>

        <p className="tip">没有账号？<Link href="/sign_up"><a>点击注册</a></Link></p>
      </div>
      <style jsx global>{`
        .signIn img{
          display: block;
          width: 300px;
          margin: 32px auto 0;
        }
        .signIn h1{
          text-align: center;
          margin: 56px 0 8px;
        }
        .signIn .formWrapper{
          width: 300px;
          margin: 0 auto;
        }
        .signIn .field-content input{
        }
        .signIn .label-text{
          width: 5em;
          text-align: right;
          color: mediumblue;
          font-weight: bolder;
        }
        .signIn .formWrapper .actions{
          display: flex;
          flex-direction: row-reverse;
        }
        .signIn .formWrapper .actions button{
          width: 64px;
          height: 1.8em;
        }
        .signIn p{
          text-align: center;
          margin-top: 16px;
        }
      `}</style>


    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(async (context: NextApiRequest & GetServerSidePropsContext<ParsedUrlQuery>) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser');
  return {
    props: {
      user: JSON.parse(JSON.stringify(user || ''))
    }
  };
});