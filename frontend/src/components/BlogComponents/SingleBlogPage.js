import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { thunkGetSingleBlog } from "../../store/blog";

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
            <h1>Blog {blogId} details page</h1>
        </>
    )
}

export default SingleBlogPage;