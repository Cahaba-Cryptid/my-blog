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
            <main className="container">
                <form className="form-group p-3 shadow m-2 bg-light" onSubmit={() => addBlog()}>
                    <textarea rows={1} className="form-control m-2" value={newBlogTitle} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setNewBlogTitle(event.target.value)} placeholder="Blog Title" />
                    <textarea rows={5} className="form-control m-2" value={newBlog} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setNewBlog(event.target.value)} placeholder="Blog Content" />
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
            </main>
        </>
    )

}

interface ITags {
    id: number,
    name: string,
    _created: Date
}



export default NewBlog;