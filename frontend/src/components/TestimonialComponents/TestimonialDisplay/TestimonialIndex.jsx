import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllTestimonials, thunkDeleteTestimonial } from "../../../store/testimonial";
import TestimonialItem from "./TestimonialItem";
import "swiper/css";
import "swiper/css/navigation";
import "./display.css";

const TestimonialIndex = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonial.testimonials);

  useEffect(() => {
    dispatch(thunkGetAllTestimonials());
  }, [dispatch]);

  return (
    <div>
      <h1>Testimonials</h1>
      <ul className="testimonial-index">
        {testimonials?.map((testimonial, i) => (
          // <SwiperSlide>
          <TestimonialItem
            name={testimonial.name}
            body={testimonial.body}
            stars={testimonial.stars}
            profile_pic={testimonial.profile_pic}
            id={testimonial.id}
            key={i}
            deleteTest={thunkDeleteTestimonial}
          />
        ))}
      </ul>
    </div>
  );
};

export default TestimonialIndex;
