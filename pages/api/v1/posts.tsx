import {NextApiHandler} from 'next';
import {Post} from '../../../src/entity/Post';
import withSession from '../../../lib/withSession';
import {getDatabaseConnection} from '../../../lib/getDatebaseConnection';

const Posts: NextApiHandler = withSession(async (req, res) => {
  if(req.method === 'POST'){
    const {title,content} = req.body
    const post  = new Post()
    post.title = title
    post.content = content
    const user = req.session.get('currentUser')
    post.author = user
    const connection = await getDatabaseConnection()
    await connection.manager.save(post)
    res.json(post)
    console.log('6666666');
  }
});
export default Posts;
