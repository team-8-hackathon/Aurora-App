
import { useState } from "react";
import './app.css'
import StarRating from "./StarRating";

function TestimonialForm() {
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [body, setBody] = useState("");
  const [stars, setStars] = useState(0);

  const newTestimonial = { name, pic, body, stars };

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="form-testimonial" onSubmit={handleSubmit}>
      <h1>Testimonail Form</h1>
      <img className="fa fa-user-circle" aria-hidden="true"></img>
      <label htmlFor="">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <StarRating onSetStars={setStars} />
      <label>Review</label>
      <textarea
        type="text"
        value={body}
        maxLength="1000"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Let us know what you think!"
      />
      <button>Submit</button>
      {console.log({ newTestimonial })}
    </form>
  );
}

export default TestimonialForm;
