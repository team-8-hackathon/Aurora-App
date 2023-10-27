import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { thunkGetSingleBlog } from "../../store/blog";
import parse from 'html-react-parser';


const SingleBlogPage = () => {
    const { blogId } = useParams();
    const dispatch = useDispatch();
    const blog = useSelector(state => state.blog.singleBlog)
    const history = useHistory();


    useEffect(() => {
        dispatch(thunkGetSingleBlog(blogId))
    }, [dispatch, blogId])

    if (!blog) return null;

    const topicRedirect = () => {
        history.push(`/topics/${blog.topic.id}`)
    }
    
    return (
        <div>
            <img src={blog.thumbnail} alt="thumbnail" />
            <div>
                <p>Written by Aurora</p>
                <button onClick={topicRedirect}>{blog.topic.topic}</button>
            </div>
            {parse(blog.body)}
        </div>
    )
}

export default SingleBlogPage;