import * as express from 'express';

import db from '../../db';

const router =  express.Router();

router.get('/', async (req, res) => {
    try {
        res.json(await db.Blogs.getAllTags())
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:blogid', async (req, res) => {
    let id = req.params.blogid;
    try {
        res.json(await db.Blogs.getBlogTags(id));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default router;