import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { thunkGetSingleBlog } from "../../store/blog";
import parse from 'html-react-parser';

const SingleBlogPage = () => {
    const { blogId } = useParams();
    const dispatch = useDispatch();
    const blog = useSelector(state => state.blog.singleBlog)

    useEffect(() => {
        dispatch(thunkGetSingleBlog(blogId))
    }, [dispatch])

    if(!blog) return null;
    console.log(blog)
    return (
        <>
            <img src={blog.thumbnail} alt="thumbnail" />
            <button onClick={e=> window.alert("redirect to topic page")}>{blog.topic.topic}</button>
            {parse(blog.body)}
        </>
    )
}

export default SingleBlogPage;