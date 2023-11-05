import { useEffect, useState } from "react";
import "./form.css";
import StarRating from "./StarRating";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkCreateTestimonial } from "../../../store/testimonial";

function TestimonialForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profile_pic, setProfile_pic] = useState("");
  const [preview_img, setPreviewImg] = useState("");
  const [body, setBody] = useState("");
  const [stars, setStars] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  // onChange={e => setThumbnail(e.target.files[0])}
  function getFile(e) {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
    setProfile_pic(e.target.files[0]);
  }

  useEffect(() => {
    const validationErrors = {};
    if (!firstName) validationErrors.firstName = "First name is required";
    if (!lastName) validationErrors.lastName = "Last name is required";
    if (!stars) validationErrors.stars = "Star rating is required";
    if (!body) validationErrors.body = "Testimonial body is required";
    setErrors(validationErrors);
  }, [firstName, lastName, stars, body]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!Object.keys(errors).length) {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("profile_pic", profile_pic);
      formData.append("body", body);
      formData.append("stars", stars);
      // formData.append("favorited", false)
      const response = await dispatch(thunkCreateTestimonial(formData));
      if (response.id) history.push("/");
      else {
        setErrors({ serverErrors: response });
      }
    }
  };

  return (
    <form
      className="form-testimonial"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div>
        <h1>Tell us what you think of Aurora!</h1>
        {/* <h3>We would love your honest opinion</h3> */}
      </div>
      <div className="test-form-container">
        <div className="test-form-left">
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

          <label htmlFor="img" className="custom-file-upload">
            Upload Image
          </label>
          {/* <input id="file-upload" type="file" /> */}
          <div className="test-form-stars">
            <StarRating onSetStars={setStars} />
            {errors.stars && <p className="errors">{errors.stars}</p>}
          </div>
        </div>
        {/* <label htmlFor="">Name</label> */}
        <div className="test-form-right">
          {/* <div>
            <input
              className="name-input"
              type="email"
              value={firstName}
              // onChange={(e) => setFirstName(e.target.value)}
              placeholder="Email"
            />
          </div> */}
          <div className="test-form-names">
            <div className="name-input-sec">
              {/* {errors.lastName && <p className="errors">{errors.firstName}</p>} */}
              {console.log("errors  ", errors, "submitted: ", hasSubmitted)}
              <input
                className="name-input"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
              />
            </div>
            <div name-input-sec>
              {/* {errors.lastName && <p className="errors">{errors.lastName}</p>} */}
              <input
                className="name-input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div>
            <textarea
              className="testimonial-form-textarea"
              type="text"
              value={body}
              maxLength="75"
              onChange={(e) => setBody(e.target.value)}
              placeholder="Let us know what you think!"
              required
            />
            {/* {errors.body && <p className="errors">{errors.body}</p>} */}
          </div>
        </div>
      </div>
      <button className="form-btn">Submit</button>
    </form>
  );
}

export default TestimonialForm;
