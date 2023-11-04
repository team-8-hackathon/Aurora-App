import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { thunkGetSingleBlog } from "../../store/blog";
import { thunkGetAllTopics } from "../../store/topics";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import YouTube from "@tiptap/extension-youtube"
import EditorMenuBar from "./EditorMenuBar";
import { thunkEditBlog } from "../../store/blog";
import { AiFillFileImage } from 'react-icons/ai'
import './BlogComponents.css'

const EditBlogForm = () => {
    const { blogId } = useParams();
    const oldBlog = useSelector(state => state.blog.singleBlog)
    const topics = useSelector(state => state.topic.topics)

    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState(oldBlog?.title)
    const [thumbnail, setThumbnail] = useState()
    const [topic, setTopic] = useState(oldBlog?.topic)
    const [body, setBody] = useState(oldBlog?.body)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    
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
        if (!body || !body.length) validationErrors.body = "Blog body is required"
        if (!topic || isNaN(topic)) validationErrors.topic = "Blog Topic is required"
        setErrors(validationErrors)
    }, [title, thumbnail, body, topic])
    
    useEffect(() => {
        dispatch(thunkGetSingleBlog(blogId))
        dispatch(thunkGetAllTopics())
    },[dispatch, blogId])

    useEffect(() => {
        if(oldBlog && topics && oldBlog.topic && editor) {
            setTitle(oldBlog.title)
            setBody(oldBlog.body)
            setTopic(oldBlog.topic)
            editor.commands.setContent(oldBlog.body)
        }
    }, [oldBlog, topics])

    useEffect(() => {
        if(title && body) setIsLoaded(true)
    }, [title, body])
    
    if(!isLoaded || !oldBlog || !topics) return null

    const oldThumbnail = oldBlog.thumbnail;
    const oldTopic = oldBlog.topic;

    const editBlog = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);
        if (!Object.keys(errors).length) {
            const formData = new FormData();
            if(thumbnail) formData.append('thumbnail', thumbnail)
            formData.append('title', title)
            formData.append('body', body.toString())
            formData.append('topic_id', topic)

            const response = await dispatch(thunkEditBlog(formData, blogId))
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
            <form className="blog-form" encType="multipart/form-data" onSubmit={editBlog}>
                <h2>Create a Blog Post</h2>
                <label htmlFor="title">Blog Title</label>
                {hasSubmitted && errors.title && <p className="errors">{errors.title}</p>}
                <input name='title' value={title} onChange={e => setTitle(e.target.value)} />

                <label htmlFor="topic">Topic</label>
                {hasSubmitted && errors.topic && <p className="errors">{errors.topic}</p>}
                <select defaultValue={oldTopic.id} onChange={e => setTopic(e.target.value)}>
                    <option id="select-topic" >Select a Topic...</option>
                    {topics.map(currTopic => (
                        <option key={currTopic.id} value={currTopic.id} >{currTopic.topic}</option>
                    ))}
                </select>

                <label className="file-upload">
                {hasSubmitted && errors.thumbnail && <p className="errors">{errors.thumbnail}</p>}
                <input id="file-upload" name="thumbnail" type='file' accept='image/*' onChange={e => setThumbnail(e.target.files[0])} /><AiFillFileImage style={{'color': '#00283d', 'fontSize': '1.5rem'}} />&nbsp;&nbsp;{!thumbnail && <p>Add thumbnail</p>}{thumbnail && <p>{thumbnail.name}</p>}</label>
                <p>Current thumbnail:</p>
                <img src={oldThumbnail} alt='thumbnail' />

                {hasSubmitted && errors.body && <p className="errors">{errors.body}</p>}
                <div className="text-editor-container">
                    <EditorMenuBar editor={editor} />
                    <EditorContent id="text-content" editor={editor} />
                </div>
                <div className="button-container">
                    <button className='blog-post-button cancel' type='button' onClick={handleCancel}>Cancel</button>
                    <button className="blog-post-button submit">Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default EditBlogForm;