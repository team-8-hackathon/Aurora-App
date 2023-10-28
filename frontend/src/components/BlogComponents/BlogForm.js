import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import YouTube from "@tiptap/extension-youtube"
import EditorMenuBar from "./EditorMenuBar";
import './BlogComponents.css'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { thunkPostBlog } from "../../store/blog";
import { thunkGetAllTopics } from "../../store/topics";


const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [topic, setTopic] = useState('')
    const [body, setBody] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const topics = useSelector(state => state.topic.topics)

    const dispatch = useDispatch();
    const history = useHistory();

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
        if (!thumbnail || !thumbnail.length) validationErrors.thumbnail = "Blog thumbnail is required"
        if (!body || !body.length) validationErrors.body = "Blog body is required"
        if (!topic || !topic.length) validationErrors.topic = "Blog Topic is required"
        setErrors(validationErrors)
    }, [title, thumbnail, body, topic])

    useEffect(() => {
        dispatch(thunkGetAllTopics())
    }, [dispatch])

    if(!topics) return null;

    const submitBlog = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (!Object.keys(errors).length) {
            const formData = new FormData();
            formData.append('thumbnail', thumbnail)
            formData.append('title', title)
            formData.append('body', body.toString())
            formData.append('topic', topic)

            const response = await dispatch(thunkPostBlog(formData))
            if (response.id) {
                history.push(`/blogs/${response.id}`)
            } else {
                setErrors({ "serverErrors": response })
            }
        }
    }
    return (
        <div className="blog-form-container">
            <form encType="multipart/form-data" onSubmit={submitBlog}>
                <h2>Create a Blog Post</h2>
                <label htmlFor="title">Blog Title</label>
                {hasSubmitted && errors.title && <p className="errors">{errors.title}</p>}
                <input name='title' value={title} onChange={e => setTitle(e.target.value)} />
                <label htmlFor="topic">Topic</label>
                {hasSubmitted && errors.topic && <p className="errors">{errors.topic}</p>}
                <select onChange={e => setTopic(e.target.value)}>
                    <option>Select a Topic...</option>
                    {topics.map(topic => (
                        <option key={topic.id} value={topic.id}>{topic.topic}</option>
                    ))}
                </select>
                <label htmlFor="thumbnail">Blog Thumbnail</label>
                {hasSubmitted && errors.thumbnail && <p className="errors">{errors.thumbnail}</p>}
                <input name="thumbnail" type='file' accept='image/*' onChange={e => setThumbnail(e.target.files[0])} />
                {hasSubmitted && errors.body && <p className="errors">{errors.body}</p>}
                <EditorMenuBar editor={editor} />
                <EditorContent id="text-content" editor={editor} />
                <button>Post Blog</button>
            </form>
        </div>
    )
}

export default BlogForm;