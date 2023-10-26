import React from "react";

const BlogThumbnail = ({ topic, blog }) => {
    return (
        <div>
            <p>{topic.topic}</p>
            <img src={blog.thumbnail} alt='thumbnail'/>
            <p>{blog.title}</p>
        </div>
    )
}

export default BlogThumbnail;