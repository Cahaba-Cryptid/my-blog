import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { useState, useEffect } from 'react';
import { json, Author } from '../utils/api';

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

    useEffect(() => {
        if(!Author || Author.authorid === null || Author.role !== 'admin') {
            props.history.replace('/login');
        }
    }, []);

    const handleDelete = async () => {
        let id = props.match.params.id;
        try {
            await fetch(`/api/blogs/${id}`, {
                method: "DELETE"
            });
            props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async () => {
        let id = props.match.params.id
        let body = {
            title: 'edited',
            content: blog
        }
        try {
            await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
            props.history.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="card row m-3 w-50 shadow">
                <div className="card-body p-1">
                    {/* <input className="m-2" value={blog} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBlog(event.target.value)} /> */}
                    <div className="input-group">
                        <div className="input-group-prepend">
                        </div>
                        <textarea rows={5} className="form-control m-2" value={blog} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setBlog(event.target.value)} />
                    </div>
                    <div className="row">
                        <button className="btn btn-warning ml-5" onClick={() => handleEdit()}>Submit Edit</button>
                        <button className="btn btn-danger mx-3" onClick={() => handleDelete()}>Delete FOREVER!!!!!!</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export interface IAdminBlogProps extends RouteComponentProps<{ id: string }> { };

export default Admin;