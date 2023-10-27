import { useState } from "react";
import "./app.css";
import StarRating from "./StarRating";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkCreateTestimonial } from "../../store/testimonial";

function TestimonialForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [body, setBody] = useState("");
  const [stars, setStars] = useState(0);

  function getFile(e) {
    setPic(URL.createObjectURL(e.target.files[0]));
  }

  const newTestimonial = { name, pic, body, stars };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await dispatch(thunkCreateTestimonial(newTestimonial));
    history.push("/");
  };

  return (
    <form className="form-testimonial" onSubmit={handleSubmit}>
      <div className="form-testimonial-img">
        {pic ? (
          <img className="profile-img" src={pic} alt="PiClient" />
        ) : (
         <img src="../../../public/images/aurora.png" alt="Aurora"/>
        )}
        {/* <label for="img">Profile image</label> */}
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={getFile}
          className="pic-input"
          placeholder="Set Pic"
        />

        <label for="img" class="custom-file-upload">
          Upload Image
        </label>
        {/* <input id="file-upload" type="file" /> */}
      </div>
      {/* <label htmlFor="">Name</label> */}
      <input
        className="name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <StarRating onSetStars={setStars} />
      {/* <label>Review</label> */}
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
