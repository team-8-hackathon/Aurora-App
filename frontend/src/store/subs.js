const GET_ALL_SUBS = "subs/GET_ALL_SUBS"

const actionGetAllSubs = (subs) => ({
    type: GET_ALL_SUBS,
    subs
})


  export const thunkGetAllSubs = () => async (dispatch) => {
    try {
      const response = await fetch('/api/subs/');
      if (response.ok) {
        const data = await response.json();
        dispatch(actionGetAllSubs(data.subs));
        return data;
      } else {
        const errors = await response.json();
        return errors;
      }
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  };
  
  export const thunkDeleteSub = (id) => async (dispatch) => {
    const response = await fetch(`/api/subs/${id}/delete`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(thunkGetAllSubs());  
        return { success: true };
    } else {
        const errors = await response.json();
        console.log(response)
        return errors;
    }
};

const initialState = { subs: null }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SUBS:
            return { ...state, subs: action.subs }
        
        default:
            return state;
    }
}