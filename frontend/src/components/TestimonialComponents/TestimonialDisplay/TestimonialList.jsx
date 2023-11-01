import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllTestimonials } from "../../../store/testimonial";
import TestimonialItem from "./TestimonialItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle"
import "./display.css";


const TestimonialList = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonial.testimonials);

  useEffect(() => {
    dispatch(thunkGetAllTestimonials());
  }, [dispatch]);

  return (
    <div className="test-car">
      <Swiper
        className="testimonial-list"
        spaceBetween={5}
        slidesPerView={4}
        loop={true}
      >
        {testimonials?.map((testimonial, i) => (
          <SwiperSlide>
            <TestimonialItem
              name={testimonial.name}
              body={testimonial.body}
              stars={testimonial.stars}
              profile_pic={testimonial.profile_pic}
              key={i}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialList;
