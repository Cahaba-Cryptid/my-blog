import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SinlgeBlog: React.SFC<ISinlgeBlogProps> = props => {

    const [tags, setTags] = useState<Array<{name: string}>>([])
    const [blog, setBlog] = useState<Blog>({
        id: null,
        authorid: null,
        title: null,
        _created: null,
        content: null,
        name: null
    });

    const getBlog = async () => {
        let r2 = await fetch(`/api/blogtags/${props.match.params.id}`)
        let tags = await r2.json()
        let r = await fetch(`/api/blogs/${props.match.params.id}`);
        let blog = await r.json();
        setTags(tags);
        console.log(tags)
        setBlog(blog);
    }
    useEffect(() => {
        getBlog();
    }, []);

return (
    <>
        <main className="col-md-12">
                    <div key={blog.id} className="card m-4 shadow">
                        <div className="card-body">
                            <h5 className="card-title">{blog.title}:</h5>
                            <p className="card-text">By: {blog.name}</p>
                            <p className="card-text">{blog.content}</p>
                            <p>Tags: </p>
                            {tags.map(tag => {
                                return(
                                    <>
                                        <p className=" mx-2 badge badge-pill badge-info" key={blog.id}>{tag.name}</p>
                                    </>
                                )
                            })}
                            <Link className="btn btn-success my-2 mx-1 float-right" to={`/admin/${blog.id}`}>Admin</Link>
                        </div>
                    </div>
            </main>
    </>
)

}

interface ISinlgeBlogProps extends RouteComponentProps<{id: string}>{}

interface Blog {
    id: number,
    authorid: number,
    title: string,
    _created: Date,
    content: string,
    name: string
}
export default SinlgeBlog;