import { useState } from "react";
import "./app.css";
import StarRating from "./StarRating";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkCreateTestimonial } from "../../../store/testimonial";

function TestimonialForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [profile_pic, setProfile_pic] = useState("");
  const [preview_img, setPreviewImg] = useState('');
  const [body, setBody] = useState("");
  const [stars, setStars] = useState(0);
  // onChange={e => setThumbnail(e.target.files[0])}
  function getFile(e) {
    setPreviewImg(URL.createObjectURL(e.target.files[0]))
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
      <div className="form-testimonial-img">
        {preview_img ? (
          <img className="profile-img" src={preview_img} alt="User" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="profile-img"
          >
            <g fill="none">
              <g
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                opacity=".2"
              >
                <path d="M7.75 6.6c0-1.95 1.53-3.6 3.5-3.6s3.5 1.65 3.5 3.6c0 1.95-1.53 3.6-3.5 3.6s-3.5-1.65-3.5-3.6Z" />
                <path d="M11.264 9.067c-3.225 0-6.014 2.471-6.014 5.766l.002 2.168A1 1 0 0 0 6.25 18h10a1 1 0 0 0 1-1v-2.167c0-3.288-2.755-5.766-5.986-5.766Z" />
              </g>
              <circle
                cx="9.5"
                cy="5.5"
                r="3"
                stroke="currentColor"
                stroke-linecap="round"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                d="M15 16.5v-2c0-3.098-2.495-6-5.5-6c-3.006 0-5.5 2.902-5.5 6v2"
              />
            </g>
          </svg>
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
        type="text"
        value={body}
        maxLength="1000"
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
