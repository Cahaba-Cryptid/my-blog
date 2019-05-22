import * as express from 'express';

import DB from '../../db';
import { HashPassword } from '../../utils/security/passwords'
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let author = req.body;
        author.password = HashPassword(req.body.password);
        let [result]: any = await DB.Authors.insertAuthor(author)
        let token = await CreateToken({ authorid: result.insertId });
        res.json({
            token,
            role: 'guest',
            authorid: result.insertId
        });
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

export default router;