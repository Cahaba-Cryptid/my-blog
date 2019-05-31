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
        let blogtags = await db.Blogs.getBlogTags(id);
        res.json(blogtags[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default router;