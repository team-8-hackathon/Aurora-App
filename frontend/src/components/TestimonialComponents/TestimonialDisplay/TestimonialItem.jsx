import React from "react";
import "./app.css";
import OpenModalButton from "../../UtilityComponents/OpenModalButton";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmModal from "../../UtilityComponents/ConfirmModal";
import { useDispatch } from "react-redux";
import { thunkDeleteTestimonial } from "../../../store/testimonial";


const TestimonialItem = ({ testimonial, type }) => {
  const { first_name, last_name, stars, profile_pic, body } = testimonial;
  const starsArr = [1,2,3,4,5];
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(thunkDeleteTestimonial(testimonial.id))  
  }

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
        <div className="image-container">
          <img className='profile-border' src="/images/scribbleBorder.png" alt='border'/>
          <img className='profile-pic' src={profile_pic} alt='Profile'></img>
        </div>
        <p className="testimonial-name">{first_name}&nbsp;&nbsp;{last_name}</p>
      </div>
      {type === "admin" && <OpenModalButton className="testimonial-delete-button edit-delete-button" title="Delete" buttonText={<FaTrashAlt />}
                    modalComponent={<ConfirmModal modalTitle={'Are you sure you want to delete this testimonial?'} yesHandler={handleDelete} />} />}
    </li>
  );
};

export default TestimonialItem;
