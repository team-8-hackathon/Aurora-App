
import { useState } from "react";

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
      <label htmlFor="">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Review</label>
      <textarea
        type="text"
        value={body}
        maxlength="70"
        onChange={(e) => setBody(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}

export default TestimonialForm;
