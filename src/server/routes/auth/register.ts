import * as express from 'express';

import DB from '../../db';
import { HashPassword } from '../../utils/security/passwords'
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let author = req.body;
        author.password = HashPassword(req.body.password);
        let data = Object.values(author); 
        let result: any = await DB.Authors.insertAuthor([author.email, author.name, author.password]);
        let token = await CreateToken({ authorid: result.insertId });
        console.log(result);
        console.log(data);
        res.json({
            token,
            role: 'admin',
            authorid: result.insertId
        });
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
});

export default router;