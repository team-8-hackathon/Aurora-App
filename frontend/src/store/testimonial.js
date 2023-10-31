const GET_ALL_TESTIMONIALS = "testimonial/GET_ALL_TESTIMONIALS"
// regular action creator

const loadTestimonials = (testimonials) => {
  return {
    type: GET_ALL_TESTIMONIALS,
    testimonials
  }
}


// thunk action creator

export const thunkCreateTestimonial = (data) => async (dispatch) => {
  const response = await fetch(`/api/testimonial/new`, {
    method: "POST",
    body: data
  })
  if(response.ok){
    const data = await response.json();
    dispatch(loadTestimonials(data));
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const thunkGetAllTestimonials = () => async (dispatch) => {
  const response = await fetch(`/api/testimonial`);
  if(response.ok){
    const data = await response.json();
    // console.log('---------------data',data)
    dispatch(loadTestimonials(data))
    return data;
  }
}

export const thunkDeleteTestimonial = (testId) => async dispatch => {
  const response = await fetch(`/api/testimonial/${testId}/delete`, {
    method: 'DELETE'
  })

  if(response.ok){
    const data = await response.json()
    dispatch(thunkGetAllTestimonials())
    return data
  } else {
    const errors = await response.json();
    return errors
  }

}

// state object
const initialState = {};

export default function reducer (state = initialState, action){
  switch(action.type) {
    case GET_ALL_TESTIMONIALS: {
      return {...state, ...action.testimonials}
    }
    default:
      return state;
  }
};
