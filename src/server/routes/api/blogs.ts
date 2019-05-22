import * as express from 'express';
import { RequestHandler } from 'express-serve-static-core';

import db from '../../db';

const router = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
    if(!req.user || req.user.role !== 'admin') {
        return  res.sendStatus(401);
    } else {
        return next();
    }
}

router.get('/', isAdmin, async (req, res) => {
    try {
        res.json(await db.Blogs.allBlogs())
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json((await db.Blogs.oneBlog(req.params.id))[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
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

router.delete('/:id', isAdmin, async (req, res) => {
    try {
        //delete a blog id from BlogTags then Blogs table
        await db.Blogs.delTags(req.params.id)
        res.json(await db.Blogs.delBlog(req.params.id))
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/:id', isAdmin, async (req, res) => {
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

export default router;