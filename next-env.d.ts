/// <reference types="next" />
/// <reference types="next/types/global" />
import * as next from 'next'
// d.ts 文件如果有 import 就不是全局类型声明了
declare module "*.png" {
  const value: string;
  export default value;
}



declare module 'next' {
  import {Session} from 'next-iron-session';

  interface NextApiRequest{
    session:Session
  }
}
