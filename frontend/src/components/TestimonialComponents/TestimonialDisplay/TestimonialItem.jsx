import React from "react";
import "./display.css";
import { useSelector, useDispatch } from "react-redux";

const TestimonialItem = ({ name, stars, profile_pic, body ,deleteTest, id}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const starsArr = [1,2,3,4,5];

 const deleteTestimonial = (id) => {
  dispatch(deleteTest(id))
 }

  return (
    <li className="testimonial-item">
      <div>
        <div className="testimonial-stars">
          {starsArr.slice(0, stars).map((star) => (
            <img
              src={`/images/stars/${star}star.png`}
              alt="star"
              key={star}
              className="star-item"
            />
          ))}
        </div>
        <p className="testimonial-body">"{body}"</p>
      </div>
      <div className="testimonial-item-bottom">
        <div>
          <img
            src={profile_pic}
            alt="Profile"
            className="testimonial-item-profile-img"
          ></img>
        </div>
        <p className="testimonial-name">{name}</p>
      </div>
      <button onClick={() => deleteTestimonial(id)}>Delete</button>
    </li>
  );
};

export default TestimonialItem;
