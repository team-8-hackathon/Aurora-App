import { useEffect, useState } from "react";
import "./app.css";
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
  const [preview_img, setPreviewImg] = useState('');
  const [body, setBody] = useState("");
  const [stars, setStars] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  // onChange={e => setThumbnail(e.target.files[0])}
  function getFile(e) {
    setPreviewImg(URL.createObjectURL(e.target.files[0]))
    setProfile_pic(e.target.files[0]);
  }

  useEffect(() => {
    const validationErrors = {}
    if(!firstName) validationErrors.firstName = "First name is required"
    if(!lastName) validationErrors.lastName = "Last initial is required"
    if(!stars) validationErrors.stars = "Star rating is required"
    if(!body) validationErrors.body = "Testimonial body is required"
    setErrors(validationErrors)
  }, [firstName, lastName, stars, body])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if(!Object.keys(errors).length){
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("profile_pic", profile_pic);
      formData.append("body", body);
      formData.append("stars", stars);
      const response = await dispatch(thunkCreateTestimonial(formData));
      if(response.id) history.push("/");
      else {
        setErrors({serverErrors: response})
      }
    }
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
         <img src="/images/defaultUser.png" alt='User'/>
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
      </div>
      {/* <label htmlFor="">Name</label> */}
      {errors.firstName && <p className="errors">{errors.firstName}</p>}
      <input
        className="name-input"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      {errors.lastName && <p className="errors">{errors.lastName}</p>}
      <input
        className="name-input"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Initial"
      />
      {errors.stars && <p className="errors">{errors.stars}</p>}
      <StarRating onSetStars={setStars} />
      {errors.body && <p className="errors">{errors.body}</p>}
      <textarea
        type="text"
        value={body}
        maxLength="1000"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Let us know what you think!"
      />
      <button className="form-btn">
        Submit
      </button>
    </form>
  );
}

export default TestimonialForm;
