import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import config from '../../config';
import DB from '../../db';

export const CreateToken = async (payload: IPayload) => {
    let tokenid: any = await DB.Tokens.insert(payload.authorid);
    payload.tokenid = tokenid.insertId;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload, config.auth.secret);
    await DB.Tokens.update(payload.tokenid, token);
    return token;
};

export const ValidToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.decode(token);
    let [tokenid] = await DB.Tokens.findOne(payload.tokenid, token);
    if(!tokenid) {
        throw new Error('Invalid Token!');
    } else {
        return payload;
    }
};

export interface IPayload {
    [key: string]: any;
    authorid: number;
    unique?: string;
}