import Connection from '../config'

import Blogs from './blogs'

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, [values], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

export default {
    Blogs
}