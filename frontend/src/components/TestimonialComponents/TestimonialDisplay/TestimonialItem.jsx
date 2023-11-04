import React from "react";
import "./display.css";
import OpenModalButton from "../../UtilityComponents/OpenModalButton";
import { FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ConfirmModal from "../../UtilityComponents/ConfirmModal";
import { useDispatch } from "react-redux";
import {
  thunkDeleteTestimonial,
  thunkEditTestimonial,
} from "../../../store/testimonial";
import { IconContext } from "react-icons";

const TestimonialItem = ({ testimonial, type }) => {
  const { first_name, last_name, stars, profile_pic, body } = testimonial;
  const starsArr = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();

  const favoriteTest = () => {
    const formData = new FormData();
    formData.append("first_name", testimonial.firstName);
    formData.append("last_name", testimonial.lastName);
    formData.append("profile_pic", testimonial.profile_pic);
    formData.append("body", testimonial.body);
    formData.append("stars", testimonial.stars);
    formData.append("favorited", !testimonial.favorited);

    dispatch(thunkEditTestimonial(formData, testimonial.id));
  };

  const fillHeart = () => {
    if (testimonial.favorited) {
      return (
        <IconContext.Provider value={{ className: "heart-btn heart-filled" }}>
          <FaHeart onClick={favoriteTest} />
        </IconContext.Provider>
      );
    } else {
      return (
        <IconContext.Provider value={{ className: "heart-btn" }}>
          <FaRegHeart onClick={favoriteTest} />
        </IconContext.Provider>
      );
    }
  };

  const handleDelete = () => {
    dispatch(thunkDeleteTestimonial(testimonial.id));
  };
  return (
    <div className="testimonial-item">
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
        <div className="image-container">
          <img
            className="profile-border"
            src="/images/scribbleBorder.png"
            alt="border"
          />
          <img className="profile-pic" src={profile_pic} alt="Profile"></img>
        </div>
        <p className="testimonial-name">
          {first_name}&nbsp;&nbsp;{last_name}
        </p>
      </div>
      {type === "admin" && fillHeart()}
      {type === "admin" && (
        <OpenModalButton
          className="testimonial-delete-button edit-delete-button"
          title="Delete"
          buttonText={<FaTrashAlt />}
          modalComponent={
            <ConfirmModal
              modalTitle={"Are you sure you want to delete this testimonial?"}
              yesHandler={handleDelete}
            />
          }
        />
      )}
    </div>
  );
};

export default TestimonialItem;
