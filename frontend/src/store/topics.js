const GET_ALL_TOPICS = "topics/GET_ALL_TOPICS"
const GET_SINGLE_TOPIC = "topics/GET_SINGLE_TOPIC"

const actionGetAllTopics = (topics) => ({
    type: GET_ALL_TOPICS,
    topics
})

const actionGetSingleTopic = (topic) => ({
    type: GET_SINGLE_TOPIC,
    topic
})

export const thunkGetAllTopics = () => async dispatch => {
    const response = await fetch('/api/topics/')

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllTopics(data.topics))
        return data
    } else {
        const errors = await response.json();
        return errors;
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





const initialState = { topics: null, singleTopic: null }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TOPICS:
            return { ...state, topics: action.topics }
        case GET_SINGLE_TOPIC:
            return { ...state, singleTopic: action.topic }
        default:
            return state;
    }
}