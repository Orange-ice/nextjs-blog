import {NextApiHandler} from 'next';
import withSession from '../../../../lib/withSession';
import {Post} from '../../../../src/entity/Post';
import {getDatabaseConnection} from '../../../../lib/getDatebaseConnection';

const Posts:NextApiHandler = withSession(async (req,res)=>{
  if(req.method==='PATCH'){
    const connection = await getDatabaseConnection();
    const {title, content,id} = req.body;
    const post = await connection.manager.findOne<Post>('Post',id)
    post.title = title;
    post.content = content;
    await connection.manager.save(post);
    res.json(post);
  }
})

export default Posts