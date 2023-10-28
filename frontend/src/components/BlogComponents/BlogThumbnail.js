import React from "react";
import topicColor from "../../utlils/colors";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { thunkDeleteBlog } from "../../store/blog";
import ConfirmModal from "../UtilityComponents/ConfirmModal";
import OpenModalButton from "../UtilityComponents/OpenModalButton.js";
import './BlogThumbnail.css'

import { FaTrashAlt } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'

const BlogThumbnail = ({ topic, blog, type }) => {
    const color = topicColor(topic.id);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {
        dispatch(thunkDeleteBlog(blog.id))
    }

    const handleEdit = () => {
        history.push(`/admin/blogs/${blog.id}/edit`)
    }
    return (
        <>
            <Link id='blog-thumbnail-link' to={`/blogs/${blog.id}`} className="blog-thumbnail"
                style={{
                    backgroundImage: `url(${blog.thumbnail})`,
                    backgroundSize: "cover"
                }}
            >
                <p className="topic-tag" style={{ 'backgroundColor': `${color}` }}>{topic.topic}</p>
                <p className="title-tag">{blog.title}</p>
            </Link>
            {type === "admin" && <OpenModalButton className="edit-delete-button"title="Delete" buttonText={<FaTrashAlt />}
                modalComponent={<ConfirmModal modalTitle={'Are you sure you want to delete your blog?'} yesHandler={handleDelete} />} />}
            {type === "admin" && <button className="edit-delete-button" title="Edit" onClick={handleEdit}><BiEdit /></button>}
        </>
    )
}

export default BlogThumbnail;