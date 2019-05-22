import { Query } from './index';

const findOneByEmail = async (email: string) => Query(`SELECT * FROM Authors WHERE email = '${email}' LIMIT 1`);

const findOneById = async (id: number) => Query(`SELECT * FROM Authors WHERE id = ${id} LIMIT 1`);

const insertAuthor = async (author: any) => Query(`INSERT INTO Authors (email, name, password) VALUES ?`, author);

export default {
    findOneByEmail,
    findOneById,
    insertAuthor
}