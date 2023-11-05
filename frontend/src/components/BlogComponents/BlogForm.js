import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import YouTube from "@tiptap/extension-youtube"
import EditorMenuBar from "./EditorMenuBar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { thunkPostBlog } from "../../store/blog";
import { thunkGetAllTopics } from "../../store/topics";
import { AiFillFileImage } from 'react-icons/ai'
import './BlogComponents.css'


const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [topic, setTopic] = useState('')
    const [body, setBody] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const [previewImage, setPreviewImage] = useState()
    const topics = useSelector(state => state.topic.topics)

    const dispatch = useDispatch();
    const history = useHistory();

    const getFile = (e) => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setThumbnail(e.target.files[0])
    }

    const editor = useEditor({
        extensions: [StarterKit, Underline, Image, Highlight, TextAlign.configure({
            types: ['heading', 'paragraph']
        }), YouTube.configure({
            ccLanguage: 'es',
        })],
        content: body,

        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setBody(html);
        }
    })

    useEffect(() => {
        const validationErrors = {}
        if (!title || !title.length) validationErrors.title = "Blog title is required"
        if (!thumbnail) validationErrors.thumbnail = "Blog thumbnail is required"
        if (!body || !body.length) validationErrors.body = "Blog body is required"
        if (!topic || !topic.length) validationErrors.topic = "Blog topic is required"

        setErrors(validationErrors)
    }, [title, thumbnail, body, topic])

    useEffect(() => {
        dispatch(thunkGetAllTopics())
    }, [dispatch])

    if (!topics) return null;

    const submitBlog = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (!Object.keys(errors).length) {
            const formData = new FormData();
            formData.append('thumbnail', thumbnail)
            formData.append('title', title)
            formData.append('body', body.toString())
            formData.append('topic_id', topic)

            const response = await dispatch(thunkPostBlog(formData))
            if (response.id) {
                history.push(`/admin/blogs/${response.id}`)
            } else {
                setErrors({ "serverErrors": response })
            }
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/admin')
    }
    return (
        <div className="blog-form-container">
            <form className="blog-form" encType="multipart/form-data" onSubmit={submitBlog}>
                <h2>Create a Blog Post</h2>
                <label htmlFor="title">Blog Title</label>
                {hasSubmitted && errors.title && <p className="errors">{errors.title}</p>}
                <input name='title' value={title} onChange={e => setTitle(e.target.value)} />

                <label htmlFor="topic">Topic</label>
                {hasSubmitted && errors.topic && <p className="errors">{errors.topic}</p>}
                <select onChange={e => setTopic(e.target.value)}>
                    <option id="select-topic">Select a Topic...</option>
                    {topics.map(topic => (
                        <option key={topic.id} value={topic.id}>{topic.topic}</option>
                    ))}
                </select>

                <label className="file-upload">
                {hasSubmitted && errors.thumbnail && <p className="errors">{errors.thumbnail}</p>}
                <input id="file-upload" name="thumbnail" type='file' accept='image/*' onChange={getFile} /><AiFillFileImage style={{'color': '#00283d', 'fontSize': '1.5rem'}} />&nbsp;&nbsp;{!thumbnail && <p>Add thumbnail</p>}{thumbnail && <p>{thumbnail.name}</p>}</label>
                {previewImage && <img className="blog-preview-image" src={previewImage} alt='thumbnail'/>}

                {hasSubmitted && errors.body && <p className="errors">{errors.body}</p>}
                <div className="text-editor-container">
                    <EditorMenuBar editor={editor} />
                    <EditorContent id="text-content" editor={editor} />
                </div>
                <div className="button-container">
                    <button className='blog-post-button cancel' type='button' onClick={handleCancel}>Cancel</button>
                    <button className="blog-post-button submit">Post Blog</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm;