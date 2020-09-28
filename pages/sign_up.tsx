import {NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {useForm} from '../hooks/useForm';
import {useRouter} from 'next/router';
import Link from 'next/link';

const SignUp: NextPage = () => {
  const router = useRouter();
  const {form} = useForm({
    initFormData: {
      username: '',
      password: '',
      passwordConfirmation: ''
    },
    buttons: <div className="actions"><button type="submit">注册</button></div>,
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'},
      {label: '确认密码', type: 'password', key: 'passwordConfirmation'},
    ],
    submit: {
      request: formData => axios.post(`/api/v1/users`, formData),
      success: () => {
        window.alert('注册成功');
        router.push('/posts');
      }
    }
  });
  return (
    <>
      <div className="signUp">
        <img src="/signInHeader.png" alt=""/>
        <h1>注册</h1>
        <div className="signUpForm">
          {form}
        </div>
        <p className="signUpTip">已有账号？<Link href="/sign_in"><a>点击登录</a></Link></p>
      </div>

      <style jsx global>{`
        .signUp img{
          display: block;
          width: 300px;
          margin: 32px auto 0;
        }
        .signUp h1{
          text-align: center;
          margin: 56px 0 8px;
        }
        .signUp .signUpForm{
          width: 300px;
          margin: 0 auto;
        }
        .signUp .field-content input{
        }
        .signUp .label-text{
          width: 5em;
          text-align: right;
          color: mediumblue;
          font-weight: bolder;
        }
        .signUp .signUpForm .actions{
          display: flex;
          flex-direction: row-reverse;
        }
        .signUp .signUpForm .actions button{
          width: 64px;
          height: 1.8em;
        }
        .signUp p{
          text-align: center;
          margin-top: 16px;
        }
      `}</style>
    </>
  );
};

export default SignUp;