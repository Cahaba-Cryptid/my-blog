import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json } from '../utils/api';

interface INewBlogProps extends RouteComponentProps {

}


const NewBlog: React.SFC<INewBlogProps> = props => {

    const [newBlogTitle, setNewBlogTitle] = useState<string>('');
    const [newBlog, setNewBlog] = useState<string>('');
    const [tags, setTags] = useState<Array<ITags>>([]);
    const [selectedTag, setSeletedTag] = useState<string>("0");

    const addBlog = async () => {
        event.preventDefault()
        let body = {
            authorid: 1,
            title: newBlogTitle,
            content: newBlog,
            tagid: selectedTag
        }
        try {
            await json('/api/blogs', 'POST', body);
            // await fetch('/api/blogs', {
            //     method: "POST",
            //     headers: { "content-type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpZCI6MSwidG9rZW5pZCI6MiwidW5pcXVlIjoiZTNlMWEwMTkzZTI2Nzc4ZGVmM2E0MWQwMTkwYThmYzM3OTM3OTE3N2Q2YmFlODkzYzhlZTk5YTAzYzM4YjVjNCIsImlhdCI6MTU1ODU1Mjg1Nn0.15Cjla_PutYH36hJ9OuHdvaXwLp7ky8A7Cp6N3cypZw" },
            //     body: JSON.stringify(body)
            // });
            props.history.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTags();
    }, []);

    const getTags = async () => {
        let r = await fetch('/api/blogtags')
        let tags = await r.json();
        setTags(tags)
    }

    return (
        <>
            <form className="form-group p-3" onSubmit={() => addBlog()}>
                {/* <input type="text" value={newBlogTitle} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewBlogTitle(event.target.value)} placeholder="Blog Title" />
                <input type="text" value={newBlog} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewBlog(event.target.value)} placeholder="Blog content" /> */}
                <textarea rows={1} className="form-control m-2" value={newBlogTitle} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setNewBlogTitle(event.target.value)} placeholder="Blog Title"/>
                <textarea rows={5} className="form-control m-2" value={newBlog} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setNewBlog(event.target.value)} placeholder="Blog Content"/>
                <select value={selectedTag} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSeletedTag(event.target.value)}>
                    <option value="0">Select a tag</option>
                    {tags.map(tag => {
                        return (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        )
                    })};
                </select>
                <button className="btn btn-primary mx-5" onClick={() => addBlog()}>Submit Blog</button>
            </form>
        </>
    )

}

interface ITags {
    id: number,
    name: string,
    _created: Date
}



export default NewBlog;