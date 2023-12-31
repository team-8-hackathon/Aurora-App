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
    dispatch(thunkGetAllTestimonials());
    return data
  } else {
    const errors = await response.json();
    return errors;
  }
}


export const thunkDeleteTestimonial = (testimonialId) => async (dispatch) => {
  const response = await fetch(`/api/testimonial/${testimonialId}/delete`, {
    method: "DELETE"
  })

  if(response.ok){
    const data = await response.json();
    dispatch(thunkGetAllTestimonials())
    return data
  } else {
    const errors = await response.json();
    return errors
  }
}

export const thunkGetAllTestimonials = () => async (dispatch) => {
  const response = await fetch(`/api/testimonial/`);
  if(response.ok){
    const data = await response.json();
    dispatch(loadTestimonials(data.testimonials))
    return data;
  } else {
    const errors = await response.json()
    return errors
  }
}

export const thunkEditTestimonial = (data ,testId) => async (dispath) => {
  const response = await fetch(`/api/testimonial/${testId}/edit`, {
    method: "PUT",
    body: data
  });
  if(response.ok) {
    const updatedTest = await response.json();
    dispath(thunkGetAllTestimonials());
    return updatedTest;
  } else {
    const errors = await response.json();
    return errors;
  }
}


// state object
const initialState = { allTestimonials: null };

export default function reducer (state = initialState, action){
  switch(action.type) {
    case GET_ALL_TESTIMONIALS: {
      return {...state, allTestimonials: action.testimonials}
    }
    default:
      return state;
  }
};
