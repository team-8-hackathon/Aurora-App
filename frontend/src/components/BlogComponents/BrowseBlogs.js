import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { thunkGetSingleTopic } from '../../store/topics';
import BlogThumbnail from './BlogThumbnail';


const BrowseBlogs = () => {
    const { topicId } = useParams();
    const topic = useSelector(state => state.topic.singleTopic)
    const [numArticles, setNumArticles] = useState(6)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSingleTopic(topicId))
    }, [dispatch, topicId])

    
    if(!topic) return null;
    const blogs = topic.blogs;

    const showMoreArticles = () => {
        if(numArticles < blogs.length){
            setNumArticles(numArticles + 6)
        }
        console.log(blogs.slice(0, numArticles))
    }
    
    return (
        <>
            <h2>{topic.topic}</h2>
            {blogs.slice(0,numArticles).map(blog => (
                <Link key={blog.id} to={`/blogs/${blog.id}`}>
                    <BlogThumbnail topic={topic} blog={blog} />
                </Link>
            ))}
            {numArticles < blogs.length && <button onClick={showMoreArticles}>Show more articles</button>}
        </>
    )
}

export default BrowseBlogs;