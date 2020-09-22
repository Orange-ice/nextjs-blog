import { withIronSession } from 'next-iron-session'
import {NextApiHandler} from 'next';

export default function withSession(handler:NextApiHandler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password:'11406663056575078404696080695426',
    cookieName: 'blog',
    cookieOptions: {secure:false},
  })
}