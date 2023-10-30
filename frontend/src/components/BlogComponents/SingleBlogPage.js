import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { thunkGetSingleBlog } from "../../store/blog";
import parse from 'html-react-parser';
import topicColor from '../../utlils/colors';
import './SingleBlogPage.css'


const SingleBlogPage = () => {
    const { blogId } = useParams();
    const dispatch = useDispatch();
    const blog = useSelector(state => state.blog.singleBlog)
    const history = useHistory();


    useEffect(() => {
        dispatch(thunkGetSingleBlog(blogId))
    }, [dispatch, blogId])

    if (!blog || !blog.topic) return null;

    const topicRedirect = () => {
        history.push(`/topics/${blog.topic.id}`)
    }
    console.log(blog)
    const color = blog.topic.color
    return (
        <div className="single-blog-container">
            <img className='single-blog-thumbnail' src={blog.thumbnail} alt="thumbnail" />
            <div className="author-topic-section">
                <p className="author-tag"><img src='/images/blog-images/auroraAvatar.png' alt='aurora' className="author-avatar" />Written by Aurora</p>
                <button className="topic-button" style={{ 'backgroundColor': `${color}` }} onClick={topicRedirect}>{blog.topic.topic}</button>
            </div>
            <div className="blog-contents-container">
                <h1 className="blog-title">{blog.title}</h1>
                <div className="blog-body">
                    {parse(blog.body)}
                </div>
            </div>
        </div>
    )
}

export default SingleBlogPage;