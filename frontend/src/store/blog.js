const GET_BLOGS = "blogs/GET_BLOGS"
const GET_SINGLE_BLOG = "blogs/GET_SINGLE_BLOG"

const actionGetBlogs = (blogs) => ({
    type: GET_BLOGS,
    blogs
})

const actionGetSingleBlog = (blog) => ({
    type: GET_SINGLE_BLOG,
    blog
})


export const thunkGetSingleBlog = (id) => async dispatch => {
    const response = await fetch(`/api/blogs/${id}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSingleBlog(data))
        return data
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const thunkGetBlogs = () => async dispatch => {
    const response = await fetch('/api/blogs/')

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetBlogs(data.blogs))
        return data
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const thunkPostBlog = (formData) = async dispatch => {
    const response = await fetch(`/api/blogs/create`, {
        method: "POST",
        body: formData
    })

    if (response.ok) {
        const newBlog = await response.json();
        dispatch(actionGetSingleBlog(newBlog.id))
        return newBlog
    } else {
        const errors = await response.json()
        return errors
    }
}



const initialState = { blogs: null, singleBlog: null }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_BLOGS:
            return { ...state, blogs: action.blogs }
        case GET_SINGLE_BLOG:
            return { ...state, singleBlog: action.blog }
        default:
            return state;
    }
}