import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllTestimonials } from "../../../store/testimonial";
import TestimonialItem from "./TestimonialItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const TestimonialList = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonial.testimonials);

  useEffect(() => {
    dispatch(thunkGetAllTestimonials());
  }, [dispatch]);

  return (
      <ul className="testimonial-list">
        {testimonials?.map((testimonial, i) => (
          // <SwiperSlide>
          <TestimonialItem
            name={testimonial.name}
            body={testimonial.body}
            stars={testimonial.stars}
            profile_pic={testimonial.profile_pic}
          />
        ))}
      </ul>
  );
};

export default TestimonialList;
