import React from "react";
import "./app.css";

const TestimonialItem = ({ name, stars, profile_pic, body }) => {
  const starsArr = [1,2,3,4,5];

  return (
    <li className="testimonial-item">
      <div>
        <div className="testimonial-stars">
          {starsArr.slice(0, stars).map((star) => (
            <img src={`/images/stars/${star}star.png`} alt='star' key={star}/>
          ))}
        </div>
        <p className="testimonial-body">"{body}"</p>
      </div>
      <div className="testimonial-item-bottom">
        <div>
          <img src={profile_pic} alt='Profile'></img>
        </div>
        <p className="testimonial-name">{name}</p>
      </div>
    </li>
  );
};

export default TestimonialItem;
