const GET_TOPICS = '/topics/GET_TOPICS'
const GET_SINGLE_TOPIC = '/topics/GET_SINGLE_TOPIC'


const actionGetTopics = (topics) => ({
    type: GET_TOPICS,
    topics
})

const actionGetSingleTopic = (topic) => ({
    type: GET_SINGLE_TOPIC,
    topic
})

export const thunkGetSingleTopic = (topicId) => async dispatch => {
    const response = await fetch(`/api/topics/${topicId}`)

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetSingleTopic(data))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkGetTopics = () => async dispatch => {
    const response = await fetch('/api/topics/')

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetTopics(data.topics))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = { topics: null, singleTopic: null }

export default function reducer(state = initialState, action) {
    switch (action.type){
        case GET_TOPICS:
            return { ...state, topics: action.topics}
        case GET_SINGLE_TOPIC:
            return { ...state, singleTopic: action.topic}
        default:
            return state;
    }
}