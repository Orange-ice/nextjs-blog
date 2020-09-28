import { withIronSession } from 'next-iron-session'
import {GetServerSideProps, NextApiHandler} from 'next';

export default function withSession(handler:NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    // password: process.env.SECRET,
    password:'11406663056575078404696080695426',
    cookieName: 'blog',
    cookieOptions: {secure:false},
  })
}