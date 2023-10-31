import { useState } from "react";
import "./form.css";
import StarRating from "./StarRating";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkCreateTestimonial } from "../../../store/testimonial";

function TestimonialForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [profile_pic, setProfile_pic] = useState("");
  const [preview_img, setPreviewImg] = useState("");
  const [body, setBody] = useState("");
  const [stars, setStars] = useState(0);
  // onChange={e => setThumbnail(e.target.files[0])}
  function getFile(e) {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
    setProfile_pic(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profile_pic", profile_pic);
    formData.append("body", body);
    formData.append("stars", stars);
    console.log("testimonials::: ");
    await dispatch(thunkCreateTestimonial(formData));
    history.push("/");
  };

  return (
    <form
      className="form-testimonial"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div>
        <h1>Tell us what you think of Aurora!</h1>
        <h3>We would love your honest opinion</h3>
      </div>
      <div className="form-testimonial-img">
        {preview_img ? (
          <img className="profile-img picture" src={preview_img} alt="User" />
        ) : (
          <img
            src="/images/defaultUser.png"
            alt="User"
            className="profile-img"
          />
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

        <label for="img" className="custom-file-upload">
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
        className="testimonial-form-textarea"
        type="text"
        value={body}
        maxLength="75"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Let us know what you think!"
      />
      <button className="form-btn" disabled={!name || !stars || !body}>
        Submit
      </button>
      {/* {console.log({ newTestimonial })} */}
    </form>
  );
}

export default TestimonialForm;
