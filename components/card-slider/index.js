import { Row, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import Slider from "react-slick";
import Link from "next/link";
import dynamic from "next/dynamic";

import styles from "./index.module.scss";

const DynamicImage = dynamic(
  () => import("../custom-image"),
  <div>...loading</div>
);

const CardSliderPanel = ({ data, title, content }) => {
  const sliderConfig = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2200,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <section className="section-block">
        <div className="block-heading-box">
          <h2 className="block-title block-title--with-border text-center">
            {title}
          </h2>
          <p className="text-center mb-0">{content}</p>
        </div>
        <Slider className="health-benefit-carousel" {...sliderConfig}>
          {data?.map((cardData, index) => (
            <Card className="card card--img-animation h-100" key={index}>
              <div className="card-img-top">
                <DynamicImage
                  src={cardData.image}
                  alt={cardData.altText}
                  className="h-100 w-100"
                />
              </div>
              <Card.Body>
                <Card.Title>{cardData.name}</Card.Title>
                <Card.Text>{cardData.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Slider>
        <Row className="mt-5">
          <Col md={12} className="text-center">
            <Link href="/benefits">
              <a className="btn btn-primary">Read All Benefits</a>
            </Link>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default CardSliderPanel;
