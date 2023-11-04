const GET_ALL_SPLASH_PAGE_PARAGRAPHS = 'splash-page/GET_ALL_SPLASH_PAGE_PARAGRAPHS'

export const loadSplashPage = (paragraphs) => ({
    type: GET_ALL_SPLASH_PAGE_PARAGRAPHS,
    paragraphs
})

export const thunkGetAllParagraphs = () => async dispatch => {
    const response = await fetch('/api/splash/');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSplashPage(data))
    }
}


const initialState = {}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_SPLASH_PAGE_PARAGRAPHS: {
            newState =  { ...action.paragraphs }
            return newState
        }
        default:
            return state;
    }
}
