import * as express from 'express';
import * as passport from 'passport';

import { CreateToken } from '../../utils/security/tokens';


const router = express.Router();

router.post('/', passport.authenticate('local'), async (req, res, next) => {
    try {
        let token = await CreateToken({ authorid: req.user.id });
        res.json({
            token,
            role: req.user.role,
            authorid: req.user.id
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

export default router;