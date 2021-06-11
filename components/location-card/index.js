import { Row, Col, Card, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Link from "next/link";
import dynamic from "next/dynamic";
import { validateArray } from "../../utilities/validators";

const DynamicImage = dynamic(
  () => import("../custom-image"),
  <div>...loading</div>
);

const LocationCard = ({ data, title, on_hover }) => {
  return (
    <>
      <main className="main-content">
        <Container>
          <div className="section-block">
            <div className="block-heading-box">
              <h2 className="block-title block-title--with-border text-center">
                {title}
              </h2>
            </div>
            <Row className="justify-content-center">
              {data?.map((cardData, index) => (
                <Col
                  lg={4}
                  md={5}
                  sm={6}
                  xs={12}
                  className="mb-5 mb-sm-0"
                  key={index.toString()}
                >
                  <a
                    href={
                      cardData.altText
                        ? `${cardData.altText}`
                        : `/locations/${cardData?._id?.city}`
                    }
                    className="card card--st-gp-lists"
                  >
                    <span className="card-img-top">
                      {cardData &&
                      validateArray(cardData.DATA) &&
                      cardData.DATA[0].image ? (
                        <DynamicImage
                          src={cardData.DATA[0].image}
                          alt={cardData.DATA[0].altText}
                          className="h-100 w-100"
                        />
                      ) : (
                        <DynamicImage
                          src={cardData.image}
                          alt={cardData.altText}
                          className="h-100 w-100"
                        />
                      )}
                    </span>
                    <span className="card-footer text-center">
                      {cardData && cardData._id?.city ? (
                        <span>{cardData._id.city}</span>
                      ) : (
                        <span>{cardData.name}</span>
                      )}
                    </span>
                  </a>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </main>
    </>
  );
};

export default LocationCard;
