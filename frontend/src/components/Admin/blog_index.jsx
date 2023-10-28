import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { thunkGetBlogs } from '../../store/blog';
import BlogThumbnail from '../BlogComponents/BlogThumbnail';
import '../BlogComponents/BrowseBlogs.css'

const BrowseBlogs = () => {
    const blogs = useSelector(state => state.blog.blogs); 
    const [numArticles, setNumArticles] = useState(6)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetBlogs())
    }, [dispatch]);

    if (!blogs) return null;

    const showMoreArticles = () => {
        if (numArticles < blogs.length) {
            setNumArticles(numArticles + 6)
        }
    }

    console.log(blogs)

    return (
        <div className='browse-blogs-container'>
            <h2 className='topic-title'>All Blogs</h2>
            <div className='blog-container'>
                {blogs.slice(0, numArticles).map((blog = {}) => (
                    <Link id='blog-thumbnail-link' key={blog.id} to={`/blogs/${blog.id}`}>
                        {blog.title}
                        
                    </Link>
                ))}
            </div>
            {numArticles < blogs.length && <button className='show-more-articles-button' onClick={showMoreArticles}>Show more articles</button>}
        </div>
    )
}

export default BrowseBlogs;
