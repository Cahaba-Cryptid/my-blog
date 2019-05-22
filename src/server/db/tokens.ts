import { Query } from './index';

const findOne = async (id: string, token: string) => Query(`SELECT * FROM Tokens WHERE id = ${id} AND token = '${token}'`);

const insert = async (authorid: number) => Query(`INSERT INTO Tokens (authorid) VALUES (${authorid})`);

const update = async (id: number, token: string) => Query(`UPDATE tokens SET Token = '${token} WHERE id = ${id}'`);

export default {
    findOne,
    insert,
    update
}