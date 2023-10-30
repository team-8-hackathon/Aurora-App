import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { thunkGetSingleTopic } from '../../store/topics';
import BlogThumbnail from './BlogThumbnail';
import './BrowseBlogs.css'


const BrowseBlogs = () => {
    const { topicId } = useParams();
    const topic = useSelector(state => state.topic.singleTopic)
    const [numArticles, setNumArticles] = useState(6)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSingleTopic(topicId))
    }, [dispatch, topicId])


    if (!topic || !topic.blogs) return null;
    const blogs = topic.blogs;

    const showMoreArticles = () => {
        if (numArticles < blogs.length) {
            setNumArticles(numArticles + 6)
        }
    }
    return (
        <div className='browse-blogs-container'>
            <h2 className='topic-title'>{topic.topic}</h2>
            <div className='blog-container'>

                {blogs && blogs.slice(0, numArticles).map(blog => (
                    <div id='blog-thumbnail-link' key={blog.id}>
                        <BlogThumbnail topic={topic} blog={blog} />
                    </div>
                ))}
            </div>
            {blogs && numArticles < blogs.length && <button className='show-more-articles-button' onClick={showMoreArticles}>Show more articles</button>}
        </div>
    )
}

export default BrowseBlogs;