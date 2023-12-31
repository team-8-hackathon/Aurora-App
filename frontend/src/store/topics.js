import { thunkGetBlogs } from "./blog";

const GET_ALL_TOPICS = "topics/GET_ALL_TOPICS"
const GET_SINGLE_TOPIC = "topics/GET_SINGLE_TOPIC"
const DELETE_TOPIC = "topics/DELETE_TOPIC";

const actionGetAllTopics = (topics) => ({
    type: GET_ALL_TOPICS,
    topics
})

const actionGetSingleTopic = (topic) => ({
    type: GET_SINGLE_TOPIC,
    topic
})

// const actionDeleteTopic = (topicId) => ({
//     type: DELETE_TOPIC,
//     topicId
// });

export const thunkGetAllTopics = () => async dispatch => {
    const response = await fetch('/api/topics/')

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllTopics(data.topics))
        return data
    } else {
        const errors = await response.json();
        return errors.errors;
    }
}

export const thunkGetSingleTopic = (id) => async dispatch => {
    const response = await fetch(`/api/topics/${id}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSingleTopic(data))
        return data
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const thunkPostTopic = (formData) => async dispatch => {
    const response = await fetch(`/api/topics/create`, {
        method: "POST",
        body: formData
    })

    if (response.ok) {
        const newTopic = await response.json();
        dispatch(thunkGetAllTopics())
        return newTopic
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkDeleteTopic = (topicId) => async (dispatch) => {
    const response = await fetch(`/api/topics/${topicId}/delete`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(thunkGetAllTopics());
        dispatch(thunkGetBlogs())  
        return { success: true };
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const thunkEditTopic = (topicId, data) => async dispatch => {
    const response = await fetch(`/api/topics/${topicId}/edit`, {
        method: "PUT",
        body: data
    })

    if(response.ok){
        const data = await response.json()
        dispatch(thunkGetAllTopics())
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}






const initialState = { topics: null, singleTopic: null }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TOPICS:
            return { ...state, topics: action.topics }
        case GET_SINGLE_TOPIC:
            return { ...state, singleTopic: action.topic }
        case DELETE_TOPIC:
            return {
                ...state,
                topics: state.topics.filter(topic => topic.id !== action.topicId)
            }
        default:
            return state;
    }
}