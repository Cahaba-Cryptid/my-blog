import * as express from 'express';
import * as passport from 'passport';

import blogsRouter from './blogs';
import tagsRouter from './tags';

const router= express.Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, author, info) => {
        if(author) req.user = author;
        return next();
    })(req, res, next);
});

router.use('/blogs', blogsRouter);
router.use('/blogtags', tagsRouter)

export default router;