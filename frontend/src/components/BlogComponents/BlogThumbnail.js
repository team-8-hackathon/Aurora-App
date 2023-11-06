import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { thunkDeleteBlog } from "../../store/blog";
import ConfirmModal from "../UtilityComponents/ConfirmModal";
import OpenModalButton from "../UtilityComponents/OpenModalButton.js";
import './BlogThumbnail.css'

import { FaTrashAlt } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { useSearch } from "../../context/SearchContext.js";

const BlogThumbnail = ({ topic, blog, type }) => {
    const color = topic.color;
    const dispatch = useDispatch();
    const history = useHistory();

    const { searching, searchData, setSearchData } = useSearch()

    const handleDelete = () => {
        dispatch(thunkDeleteBlog(blog.id))
        if(searching){
            const idx = searchData.findIndex(itm => itm.id == blog.id)
            if (idx !== -1) {
                let newArr = searchData
                newArr.splice(idx, 1)
                setSearchData(newArr)
            }
        }
    }

    const handleEdit = () => {
        history.push(`/admin/blogs/${blog.id}/edit`)
    }

    let blogPath = `/blogs/${blog.id}`
    if (type === 'admin') blogPath = `/admin/blogs/${blog.id}`
    return (
        <div className="thumbnail-container">
            <Link id='blog-thumbnail-link' to={blogPath} className="blog-thumbnail"
                style={{
                    backgroundImage: `url(${blog.thumbnail})`,
                    backgroundSize: "cover"
                }}
            >
                <div className="thumbnail-contents">
                    <p className="topic-tag" style={{ 'backgroundColor': `${color}` }}>{topic.topic}</p>
                    <p className="title-tag">{blog.title}</p>
                </div>
            </Link>
            <div className="edit-delete-button-container">
                {type === "admin" && <OpenModalButton className="edit-delete-button" title="Delete" buttonText={<FaTrashAlt />}
                    modalComponent={<ConfirmModal modalTitle={'Are you sure you want to delete your blog?'} yesHandler={handleDelete} />} />}
                {type === "admin" && <button className="edit-delete-button" title="Edit" onClick={handleEdit}><BiEdit /></button>}
            </div>
        </div>
    )
}

export default BlogThumbnail;