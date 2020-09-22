import { withIronSession } from 'next-iron-session'
import {NextApiHandler} from 'next';

console.log('---------');
console.log(process.env.SECRET);
export default function withSession(handler:NextApiHandler) {
  return withIronSession(handler, {
    password: process.env.SECRET,
    // password:'11406663056575078404696080695426',
    cookieName: 'blog',
    cookieOptions: {secure:false},
  })
}