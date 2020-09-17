import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {User} from './entity/User';
import {Post} from './entity/Post';
import {Comment} from './entity/Comment';

createConnection().then(async connection => {
  const {manager} = connection;
  // 创建 u1
  const u1 = new User();
  u1.username = 'burt';
  u1.passwordDigest = 'xxx';
  await manager.save(u1);

  //创建 post1
  const p1 = new Post();
  p1.title = '文章1';
  p1.content = '这是我的第一篇文章的内容';
  p1.author = u1;
  await manager.save(p1);

  const c1 = new Comment();
  c1.user = u1;
  c1.post = p1;
  c1.content = '这是文章1的评论内容';
  await manager.save(c1);

  connection.close();

}).catch(error => console.log(error));
