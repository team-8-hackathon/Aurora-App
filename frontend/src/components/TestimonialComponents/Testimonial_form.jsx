import { useState } from "react";
import "./app.css";
import StarRating from "./StarRating";

function TestimonialForm() {
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [body, setBody] = useState("");
  const [stars, setStars] = useState(0);

  function getFile(e) {
    setPic(URL.createObjectURL(e.target.files[0]));
  }

  const newTestimonial = { name, pic, body, stars };

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="form-testimonial" onSubmit={handleSubmit}>
      <h1>Testimonail Form</h1>
      <div className="form-testimonial-img">
        {pic ? (
          <img className="profile-img" src={pic} alt="image" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <circle cx="12" cy="6" r="4" />
              <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" />
            </g>
          </svg>
        )}
        <label for="img">Profile image</label>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={getFile}
        />
      </div>
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
