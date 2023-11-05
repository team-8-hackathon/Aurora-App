const GET_ALL_SPLASH_PAGE_PARAGRAPHS = 'splash-page/GET_ALL_SPLASH_PAGE_PARAGRAPHS'
const EDIT_SPLASH_PAGE_PARAGRAPHS = 'splash-page/EDIT_SPLASH_PAGE_PARAGRAPHS'

export const loadSplashPage = (paragraphs) => ({
    type: GET_ALL_SPLASH_PAGE_PARAGRAPHS,
    paragraphs
})

export const editSplashPage = (updatedParagraph) => ({
    type: EDIT_SPLASH_PAGE_PARAGRAPHS,
    paragraphs
})

export const thunkGetAllParagraphs = () => async dispatch => {
    const response = await fetch('/api/splash/');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSplashPage(data))
    }
}

export const thunkEditParagraph = (paragraphId, updatedParagraph) => async dispatch => {
    const response = await fetch(`/api/splash/${paragraphId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedParagraph)
    });

    if (response.ok) {
        const newParagraph = await response.json();
        dispatch(editSplashPage(newParagraph))
    }
}


const initialState = { paragraphs: {} }

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_SPLASH_PAGE_PARAGRAPHS: {
            newState =  { ...action.paragraphs }
            return newState
        }
        case EDIT_SPLASH_PAGE_PARAGRAPHS: {
            newState = { ...state }
            newState.paragraphs[action.paragraphs.id] = action.paragraphs;
            return newState
        }
        default:
            return state;
    }
}
