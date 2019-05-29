import { Query } from './index';


const allBlogs = async () => Query('SELECT Blogs.*, Authors.name from Blogs JOIN Authors on Blogs.authorid=Authors.id ORDER BY Blogs._created DESC');

const oneBlog = async (id: number) => Query('SELECT Blogs.*, Authors.name FROM Blogs JOIN Authors on Blogs.authorid=Authors.id WHERE Blogs.id = ?', [id]);

const newBlog = async (authorid: number, content: string, title: string) => Query('INSERT INTO Blogs (authorid, content, title) VALUES (?)', [authorid, content, title]);

const delBlog = async (id: number) => Query('DELETE FROM Blogs WHERE id = ?', [id]);

const updateBlog = async (title: string, content: string, id: number) => Query(`UPDATE Blogs Set title = "${title}", content = "${content}" WHERE id = ${id} `);

const getBlogTags = async (blogid: number) => Query(`CALL spBlogTags(?)`, [blogid]);

const delTags = async (blogid: number) => Query('DELETE FROM BlogTags WHERE blogid = (?)', [blogid]);

const getAllTags = async () => Query('SELECT * FROM Tags');

const addBlogTag = async (blogid: number, tagid: number) => Query('INSERT INTO BlogTags (blogid, tagid) VALUES (?)', [blogid, tagid]);


export default {
    allBlogs,
    oneBlog,
    newBlog,
    delBlog,
    updateBlog,
    getBlogTags,
    delTags,
    getAllTags,
    addBlogTag
};
