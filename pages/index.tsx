import {NextPage} from 'next';
import React from 'react';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <div className="cover">
        <img src="/logo.png" alt="logo"/>
        <h1>Burt 的个人博客</h1>
        <div className="content">
          <p>我是一个爱学习的人</p>
          <p><Link href="/posts"><a>文章列表</a></Link></p>
        </div>
      </div>

      <style jsx>{`
        .cover{
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .cover img{
          width: 24vw;
        }
        .cover h1{
          margin-top: 0.5em;
        }
        .cover .content{
          margin-top: 1em;
        }
        .cover .content p {
          margin-bottom: 0.5em;
          text-align: center;
        }
        `}</style>
    </>
  );
};

export default Home;