import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { thunkPostTopic } from '../../store/topics';
import { useHistory } from 'react-router-dom';
import { SketchPicker } from 'react-color'
import "./TopicForm.css"

const TopicForm = () => {
    const [topic, setTopic] = useState('');
    const [errors, setErrors] = useState({});
    const [color, setColor] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const validationErrors = {}
        if (!topic || !topic.length) validationErrors.topic = "Topic is required";
        setErrors(validationErrors);
    }, [topic]);



    const submitTopic = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (!Object.keys(errors).length) {
            const formData = new FormData();
            formData.append('topic', topic)
            formData.append('color', color)

            const response = await dispatch(thunkPostTopic(formData));
            if (response.id) {
                history.push(`/admin`);
                setTopic('');
                setHasSubmitted(false);
                setErrors({});
            } else {
                setErrors({ "serverErrors": response });
            }
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/admin');
    };


    return (
        <div className="topic-form-container">
            <form className="topic-form" onSubmit={submitTopic}>
                <h2>Create a Topic Post</h2>
                <label htmlFor="title">Topic Title</label>
                {hasSubmitted && errors.topic && <p className="errors">{errors.topic}</p>}
                <input name='topic' value={topic} onChange={e => setTopic(e.target.value)} />
                <label htmlFor='color-picker'>Pick a color for topic tag
                    <SketchPicker
                        color={color}
                        onChange={e => setColor(e.hex)}
                    />
                </label>

                <div className="button-container">
                    <button className='topic-post-button cancel' type='button' onClick={handleCancel}>Cancel</button>
                    <button className="topic-post-button submit">Post topic</button>
                </div>
            </form>
        </div>
    );
}

export default TopicForm;

