import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface INewBlogProps extends RouteComponentProps {

}


const NewBlog: React.SFC<INewBlogProps> = props => {

    const [newBlog, setNewBlog] = useState<string>('');
    // const [newTag, setNewTag] = useState<string>('');

    const addBlog = async () => {
        event.preventDefault()
        let body = { newBlog }
        try {
            await fetch('/api/blogs', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)
            })
            console.log('Got it!');
            props.history.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form className="form-group p-3" onSubmit={() => addBlog()}>
                <input type="text" value={newBlog} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewBlog(event.target.value)} placeholder="Blog content" />
            </form>
        </>
    )

}



export default NewBlog;