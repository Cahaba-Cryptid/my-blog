import * as React from 'react';
import { useEffect, useState } from 'react';
import BlogCard from '../Components/BlogCard';
import { json } from '../utils/api';

interface IBlog {
    id: number,
    authorid: number,
    title: string,
    _created: Date,
    content: string,
    name: string
}

const Home = () => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);

    const getBlogs = async () => {
        // let r = await fetch('/api/blogs');
        // let blogs = await r.json();
        let blogs = await json('/api/blogs');
        setBlogs(blogs);
    }
    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <>
            <BlogCard blogs={blogs} />
        </>
    )
}

export default Home;