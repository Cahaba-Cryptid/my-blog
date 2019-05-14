import * as React from 'react';
import { Link } from 'react-router-dom';
import Blog from '../Views/Home';

export interface IBlogCardProps { blogs: Blog[] }

interface Blog {
    id: number,
    authorid: number,
    title: string,
    _created: Date,
    content: string,
}

const BlogCard: React.SFC<IBlogCardProps> = props => {

    return (
        <>
            <main className="col-md-12">
                {props.blogs.map(blog => (
                    <div key={blog.id} className="card m-4 shadow">
                        <div className="card-body">
                            <h5 className="card-title">{blog.title}:</h5>
                            <p className="card-text">By: {blog.authorid}</p>
                            <p className="card-text">{blog.content}</p>
                            <Link className="btn btn-success my-2" to={`/admin/${blog.id}`}>View Full Blog</Link>
                        </div>
                    </div>
                ))}
            </main>
        </>
    )
}

export default BlogCard;