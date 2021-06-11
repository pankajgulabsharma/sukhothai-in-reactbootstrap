import Slider from "react-slick";
import CarouselElement from "../CarouselElement";

export default function Carousel({ data }) {
  const sliderConfig = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <Slider className="hero-banner" {...sliderConfig}>
        {data.map((imageData, index) => {
          return <CarouselElement key={index} imgData={imageData} />;
        })}
      </Slider>
    </>
  );
}
