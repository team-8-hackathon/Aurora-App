import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { thunkEditTopic, thunkGetSingleTopic } from "../../store/topics";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { SketchPicker } from 'react-color'

const EditTopicForm = () => {
    const oldTopic = useSelector(state => state.topic.singleTopic)
    const {topicId} = useParams();
    const [topic, setTopic] = useState(oldTopic? oldTopic.topic : '')
    const [color, setColor] = useState(oldTopic? oldTopic.color : '')
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(thunkGetSingleTopic(topicId))
    }, [dispatch, topicId])

    useEffect(() => {
        if(oldTopic){
            setTopic(oldTopic.topic)
            setColor(oldTopic.color)
        }
    },[oldTopic])

    useEffect(() => {
        const validationErrors = {}
        if (!topic || !topic.length) validationErrors.topic = "Topic is required";
        if (topic.length > 255) validationErrors.topic = "Topic must be shorter than 255 characters"
        setErrors(validationErrors);
    }, [topic]);

    if(!oldTopic) return null;

    const submitTopic = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        console.log(topic, color)
        if (!Object.keys(errors).length) {
            const formData = new FormData();
            formData.append('topic', topic)
            if(color) formData.append('color', color)
            if(!color) formData.append('color', oldTopic.color)

            const response = await dispatch(thunkEditTopic(topicId, formData))

            if (response.id) {
                history.push(`/admin/topics/${topicId}`);
                setTopic('');
                setHasSubmitted(false);
                setErrors({});
            } else {
                setErrors({ "serverErrors": response });
            }
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/admin');
    };

    return (
        <div className="topic-form-container">
            <form className="topic-form" onSubmit={submitTopic}>
                <h2>Create a Topic Post</h2>
                {errors.serverErrors && <p className='errors'>{errors.serverErrors[0]}</p>}
                <label htmlFor="title">Topic Title</label>
                {hasSubmitted && errors.topic && <p className="errors">{errors.topic}</p>}
                <input name='topic' value={topic} onChange={e => setTopic(e.target.value)} />
                <label htmlFor='color-picker'>Pick a color for topic tag:
                </label>
                <SketchPicker
                    name='color-picker'
                    className='color-picker-input'
                    color={color}
                    onChange={e => setColor(e.hex)}
                />

                <div className="button-container">
                    <button className='topic-post-button cancel' type='button' onClick={handleCancel}>Cancel</button>
                    <button className="topic-post-button submit">Edit topic</button>
                </div>
            </form>
        </div>
    )

}

export default EditTopicForm;