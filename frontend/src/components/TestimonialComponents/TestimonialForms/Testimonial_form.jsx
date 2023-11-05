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
    if (firstName.length > 200) validationErrors.firstName = "First name must be shorter than 200 characters"
    if (!lastName) validationErrors.lastName = "Last name is required";
    if (lastName.length > 200) validationErrors.firstName = "Last name must be shorter than 200 characters"
    if (!stars) validationErrors.stars = "Star rating is required";
    if (stars < 1 || stars > 5) validationErrors.stars = "Star rating must be 1 to 5 stars"
    if (!body) validationErrors.body = "Testimonial body is required";
    if (body.length > 1000) validationErrors.body = "Testimonial body must be shorter than 1000 characters"
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
          <div className="test-form-stars">
            <StarRating onSetStars={setStars} />
            {hasSubmitted && errors.stars && <p className="errors">{errors.stars}</p>}
          </div>
        </div>
        <div className="test-form-right">
          <div className="test-form-names">
            <div className="name-input-sec">
              {hasSubmitted && errors.firstName && <p className="errors">{errors.firstName}</p>}
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
            {hasSubmitted && errors.lastName && <p className="errors">{errors.lastName}</p>}
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
          {hasSubmitted && errors.body && <p className="errors">{errors.body}</p>}
            <textarea
              className="testimonial-form-textarea"
              type="text"
              value={body}
              maxLength="75"
              onChange={(e) => setBody(e.target.value)}
              placeholder="Let us know what you think!"
              required
            />
          </div>
        </div>
      </div>
      <button className="form-btn">Submit</button>
    </form>
  );
}

export default TestimonialForm;
