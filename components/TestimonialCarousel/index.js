import Slider from "react-slick";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Testimonial from "../Testimonial";

import "./index.module.scss";

function TestimonialCarousel({ data, title }) {
  const sliderRef = useRef();

  const sliderConfig = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
      responsive: [
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
              },
          }
      ],
  };

  return (
    <>
      <section className="section-block">
        <div className="block-heading-box">
          <h2 className="block-title block-title--with-border text-center">
            {title}
          </h2>
        </div>
        <Slider className="testimonial-carousel" {...sliderConfig} ref={sliderRef}>
          {data?.map((guest_feedback, index) => (
            <div key={index}>
              <Testimonial data={guest_feedback}></Testimonial>
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
}

TestimonialCarousel.propTypes = {
  testimonials: PropTypes.array,
};

TestimonialCarousel.defaultProp = {
  testimonials: [],
};

export default TestimonialCarousel;
