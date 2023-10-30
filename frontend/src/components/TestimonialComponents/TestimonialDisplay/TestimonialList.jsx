import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllTestimonials } from "../../../store/testimonial";
import TestimonialItem from "./TestimonialItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./app.css";

const TestimonialList = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonial.allTestimonials);

  useEffect(() => {
    dispatch(thunkGetAllTestimonials());
  }, [dispatch]);
  
  if(!testimonials) return null;

  return (
    <ul className="testimonial-list">
      {testimonials.map((testimonial, i) => (
        // <SwiperSlide>
        <TestimonialItem
          name={testimonial.name}
          body={testimonial.body}
          stars={testimonial.stars}
          profile_pic={testimonial.profile_pic}
          key={i}
        />
      ))}
    </ul>
  );
};

export default TestimonialList;
