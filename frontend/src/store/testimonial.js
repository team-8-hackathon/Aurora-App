const GET_ALL_TESTIMONIALS = "testimonial/GET_ALL_TESTIMONIALS"
// regular action creator

const loadTestimonials = (testimonials) => {
  return {
    type: GET_ALL_TESTIMONIALS,
    testimonials
  }
}


// thunk action creator

export const createTestimonial = (data) => async (dispatch) => {
  const response = await fetch(`/api/testimonial/new`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      profile_pic: data.profile_pic,
      stars: data.stars,
      body: data.body
    })
  })
  if(response.ok){
    const data = await response.json();
    dispatch(loadTestimonials(data));
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const getAllTestimonials = () => async (dispatch) => {
  const response = await fetch(`/api/testimonial`);
  if(response.ok){
    const data = await response.json();

    dispatch(loadTestimonials(data))
    return data;
  }
}

// state object
const initialState = {};

const testimonialReducer = (state = initialState, action) => {
  let newState
  switch(action.type) {
    case GET_ALL_TESTIMONIALS: {
      action.testimonials.forEach(testimonial => (newState[testimonial.id] = testimonial));
      return newState;
    }
    default:
      return state;
  }
};

export default testimonialReducer;