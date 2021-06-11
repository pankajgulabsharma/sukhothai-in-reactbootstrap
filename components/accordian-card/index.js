import React from "react";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicImage = dynamic(
  () => import("../custom-image"),
  <div>...loading</div>
);

const AccordionCard = ({ accordionCardData }) => {
  return (
    <>
      <ul className="location-lists three-col-layout mobile-hz-scroll list-unstyled">
        {accordionCardData.DATA.map((internalData, i) => {
          return (
            <li key={i}>
              <Card className="card--img-animation h-100">
                <div className="card-img-top">
                  <span className="card__badge">{internalData.ST_BRN}</span>
                  <DynamicImage
                    src={internalData.image}
                    alt="accordianCardImg"
                    className="h-100 w-100"
                  />
                </div>

                <Card.Body>
                  <h3 className="card-title">{internalData.ST_LOCN}</h3>
                  <Card.Text
                    as="div"
                    className="location-lists__amenities-box text-left"
                  >
                    <h5>Amenities:</h5>
                    {/* <ul className="bullet-list bullet-list--primary list-unstyled">
                      {internalData.amenities.map((data, i) => {
                        return (
                          <React.Fragment key={i}>
                            <li key={i}>{data}</li>
                          </React.Fragment>
                        );
                      })}
                    </ul> */}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link
                    href={`/locations/${internalData.F_CITY}/${internalData.ST_BRN}`}
                  >
                    <a className="btn btn-text">Read More</a>
                  </Link>
                </Card.Footer>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AccordionCard;
