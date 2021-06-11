import { Fragment } from "react";
import Card from "react-bootstrap/Card";
import dynamic from "next/dynamic";

const DynamicImage = dynamic(
  () => import("../custom-image"),
  <div>...loading</div>
);

const CelebCard = ({ data }) => {
  if (!data) return null;

  return (
    <>
      <ul className="three-col-layout list-unstyled mobile-hz-scroll mb-0">
        {data?.map((cardData, index) => {
          return (
            <Fragment key={index}>
              <li>
                <Card className="card h-100">
                  <div className="card-img-top h-auto">
                    <DynamicImage
                      src={cardData.selebImage}
                      alt={cardData.CelebName}
                      className="h-100 w-100"
                    />
                  </div>
                  <Card.Body>
                    <h3 className="card-title">{cardData.CelebName}</h3>
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: cardData.CelebComment
                      }}
                    />
                  </Card.Body>
                </Card>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default CelebCard;
