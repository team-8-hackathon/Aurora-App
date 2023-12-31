import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllTestimonials } from "../../../store/testimonial";
import TestimonialItem from "./TestimonialItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle"
import "./display.css";
import { Mousewheel } from "swiper/modules";


const TestimonialList = () => {
  const dispatch = useDispatch();
  let testimonials = useSelector((state) => state.testimonial.allTestimonials);

  testimonials = testimonials?.filter(test => test.favorited)

  useEffect(() => {
    dispatch(thunkGetAllTestimonials());
  }, [dispatch]);

  if(!testimonials) return null;

    function detectMob() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // true for mobile device
        return true
      } else {
        // false for not mobile device
       return false
      }
    }

  return (
    <div className="test-car">
      <Swiper
        className="testimonial-list"
        modules={[Mousewheel]}
        spaceBetween={5}
        slidesPerView={detectMob ? 4 : 1}
        loop={true}
        mousewheel
      >
        {testimonials?.map((testimonial, i) => (
          <SwiperSlide>
            <TestimonialItem testimonial={testimonial} key={testimonial.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialList;
