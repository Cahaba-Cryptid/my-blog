import * as express from 'express';
import db from './db';

const routes = express.Router();

routes.get('/api/blogs', async (req, res) => {
    try {
        res.json(await db.Blogs.allBlogs())
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

routes.get('/api/blogs/:id', async (req,res) => {
    try {
        res.json((await db.Blogs.oneBlog(req.params.id))[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

routes.post('/api/blogs', async (req, res) => {
    try {
        let authorid = req.body.authorid;
        let content = req.body.content;
        let title = req.body.title
        res.json(await db.Blogs.newBlog(authorid, content, title));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

routes.delete('/api/blogs/:id', async (req, res) => {
    try {
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
        let id = req.body.id;
        res.json(await db.Blogs.updateBlog(title, content, id));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})


export default routes;