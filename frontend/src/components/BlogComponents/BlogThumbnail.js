import React from "react";
import topicColor from "../../utlils/colors";

const BlogThumbnail = ({ topic, blog }) => {
    const color = topicColor(topic.id)
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