import * as express from 'express';
import * as passport from 'passport';

import blogsRouter from './blogs';

const router= express.Router();

// router.use((req, res, next) => {
//     passport.authenticate('bearer', { session: false}, (err, author, info) => {
//         if(author) req.user = author;
//         return next();
//     });
// });

router.use('/blogs', blogsRouter);

export default router;