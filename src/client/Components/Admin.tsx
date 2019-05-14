import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { useState, useEffect } from 'react';

const Admin: React.SFC<IAdminBlogProps> = props => {
    const [blog, setBlog] = useState<string>('');

    const getBlog = async () => {
        let r = await fetch(`/api/blogs/${props.match.params.id}`);
        let blog = await r.json();
        setBlog(blog.content);
    }

    useEffect(() => {
        getBlog();
    }, []);

    const handleDelete = async () => {
        let id =props.match.params.id;
        try {
            await fetch(`/api/blogs/${id}`, {
                method: "DELETE"
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async () => {
        let id = props.match.params.id
        let body = {
            blog
        }
        try {
            await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="card row m-3 w-50 shadow">
                <div className="card-body p-1">
                    <input className="m-2" value={blog} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBlog(event.target.value)} />
                    <button className="btn btn-warning ml-5" onClick={() => handleEdit()}>Edit</button>
                    <button className="btn btn-danger mx-3" onClick={() => handleDelete()}>Delete</button>
                </div>
            </div>
        </>
    )
}


export interface IAdminBlogProps extends RouteComponentProps<{ id: string }>{ };

export default Admin;