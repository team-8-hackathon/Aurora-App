import React from "react";

const BlogThumbnail = ({ topic, blog }) => {
    const colors = { 1: '#ffe27a', 2: '#ec9fb8', 3: '#9acfb1', 4: '#f4a182'}
    let color;
    if(1 <= topic.id <= 4){
        color=colors[topic.id]
    } else color = colors[0]
    return (
        <div className="blog-thumbnail"
            style={{
                backgroundImage:`url(${blog.thumbnail})`,
                backgroundSize: "cover"
            }}
        >
            <p className="topic-tag" style={{'backgroundColor': `${color}`}}>{topic.topic}</p>
            <p className="title-tag">{blog.title}</p>
        </div>
    )
}

export default BlogThumbnail;