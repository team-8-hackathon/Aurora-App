import React from "react";

const BlogThumbnail = ({ topic, blog }) => {
    return (
        <div
            style={{
                backgroundImage:`url(${blog.thumbnail})`,
                backgroundSize: "cover"
            }}
        >
            <p>{topic.topic}</p>
            <p>{blog.title}</p>
        </div>
    )
}

export default BlogThumbnail;