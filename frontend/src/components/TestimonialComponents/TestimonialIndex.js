import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllTestimonials } from "../../store/testimonial";
import EmptyTestimonials from "../UtilityComponents/EmptyTestimonials";
import TestimonialItem from "./TestimonialDisplay/TestimonialItem";
import './TestimonialIndex.css'


const TestimonialIndex = () => {
    const allTestimonials = useSelector(state => state.testimonial.allTestimonials)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllTestimonials())
    }, [dispatch])
    if (!allTestimonials) return null;
    if (!allTestimonials.length) return <EmptyTestimonials />
    return (
      <div className="browse-blogs-container">
        <h4 className="topic-title">Testimonials</h4>
        <ul className="testimonial-index-container">
          {allTestimonials.map((test) => (
            <TestimonialItem
              testimonial={test}
              type="admin"
              key={test.id}
            />
          ))}
        </ul>
      </div>
    );
}

export default TestimonialIndex;
