import React from "react";
import "./app.css";

const TestimonialItem = ({ name, stars, profile_pic, body }) => {
  return (
    <li className="testimonial-item">
      <div>
        <div className="testimonial-stars">
          {Array.from({ length: stars }, (i) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#003b5a"
              viewBox="0 0 24 24"
              stroke="#003b5a"
              className="star"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          ))}
        </div>
        <p className="testimonial-body">"{body}"</p>
      </div>
      <div className="testimonial-item-bottom">
        <div>
          {profile_pic ? (
            profile_pic
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="testimonial-item-profile-img"
            >
              <g fill="none">
                <g
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  opacity=".2"
                >
                  <path d="M7.75 6.6c0-1.95 1.53-3.6 3.5-3.6s3.5 1.65 3.5 3.6c0 1.95-1.53 3.6-3.5 3.6s-3.5-1.65-3.5-3.6Z" />
                  <path d="M11.264 9.067c-3.225 0-6.014 2.471-6.014 5.766l.002 2.168A1 1 0 0 0 6.25 18h10a1 1 0 0 0 1-1v-2.167c0-3.288-2.755-5.766-5.986-5.766Z" />
                </g>
                <circle
                  cx="9.5"
                  cy="5.5"
                  r="3"
                  stroke="currentColor"
                  stroke-linecap="round"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  d="M15 16.5v-2c0-3.098-2.495-6-5.5-6c-3.006 0-5.5 2.902-5.5 6v2"
                />
              </g>
            </svg>
          )}
        </div>
        <p className="testimonial-name">{name}</p>
      </div>
    </li>
  );
};

export default TestimonialItem;
