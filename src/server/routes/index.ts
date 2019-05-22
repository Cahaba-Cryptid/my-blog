import * as express from 'express';
import db from '../db';
import authRouter from './auth';
import apiRouter from './api';
import router from './auth';

const routes = express.Router();

router.use('/auth', authRouter);
routes.use('/api', apiRouter);

routes.get('/api/blogs', async (req, res) => {
    try {
        res.json(await db.Blogs.allBlogs())
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

routes.get('/api/blogs/:id', async (req, res) => {
    try {
        res.json((await db.Blogs.oneBlog(req.params.id))[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

routes.post('/api/blogs', async (req, res) => {
    try {
        let tagid = req.body.tagid;
        let authorid = req.body.authorid;
        let content = req.body.content;
        let title = req.body.title
        let result: any = await db.Blogs.newBlog(authorid, content, title);
        res.json(await db.Blogs.addBlogTag(result.insertId, tagid))
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

routes.delete('/api/blogs/:id', async (req, res) => {
    try {
        //delete a blog id from BlogTags then Blogs table
        await db.Blogs.delTags(req.params.id)
        res.json(await db.Blogs.delBlog(req.params.id))
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

routes.put('/api/blogs/:id', async (req, res) => {
    try {
        let title = req.body.title;
        let content = req.body.content;
        let id = req.params.id;
        res.json(await db.Blogs.updateBlog(title, content, id));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

routes.get('/api/blogtags/:blogid', async (req, res) => {
    try {
        let [r] = await db.Blogs.getTags(req.params.blogid)
        res.json(r);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

routes.get('/api/tags', async (req, res) => {
    try {
        let r = await db.Blogs.getAllTags()
        res.json(r);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



export default routes;