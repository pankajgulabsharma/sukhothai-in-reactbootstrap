import { Fragment } from "react";
import Card from 'react-bootstrap/Card';
import Link from "next/link";
import dynamic from 'next/dynamic';

const DynamicImage = dynamic(() => import("../custom-image"), <div>...loading</div>);

const Therapies = ({ data, title, content, buttonBool, therapiesUrl }) => {
  if (!data) return null;

  return (
    <>
      <section className="section-block">
        <div className="block-heading-box">
          <h2 className="block-title block-title--with-border text-center">
            {title}
          </h2>
          <p className="text-center mb-0">{content}</p>
        </div>
        <ul className="three-col-layout list-unstyled mobile-hz-scroll mb-0">
          {data?.map((cardData, index) => {
            const date = new Date();
            const formattedDate = date.getDate() + " " + date.toLocaleString('default', { month: 'short' });
            return (
              <Fragment key={index}>
                <li>
                  <Card className="card card--img-animation h-100">
                    <div className="card-img-top">
                      {cardData.date && <span className="card__badge">
                        {formattedDate}
                      </span>}
                      <DynamicImage src={cardData.image} alt={cardData.altText} className="h-100 w-100" />
                    </div>
                    <Card.Body>
                      <Card.Title>{cardData.name || cardData.title}</Card.Title>
                      <Card.Text>
                        {cardData.excerpt || cardData.title}
                      </Card.Text>
                      {cardData.therapiestPrice && (
                        <Card.Text className="text-secondary lead mb-0 mt-auto">
                          Therapy starts at Rs. {cardData.therapiestPrice} for{" "}
                          {cardData.duration}
                        </Card.Text>
                      )}
                    </Card.Body>
                    <Card.Footer>
                      <Card.Link
                        className="btn btn-text"
                        href={`${therapiesUrl}${cardData?.name
                            ? cardData.name.replace(/ /g, "-")
                            : cardData?.title.replace(/ /g, "-")
                          }`}
                      // href={`${therapiesUrl}${cardData?.name?.replace(
                      //   / /g,
                      //   "-"
                      // ) || cardData?.title?.replace(/ /g, "-")}`}
                      >
                        Read More
                      </Card.Link>
                    </Card.Footer>
                  </Card>
                </li>
              </Fragment>
            );
          })}
        </ul>
        {buttonBool && (
          <div className="text-center mt-3">
            <Link href="/blogs">
              <a className="btn btn-primary">View All Blogs</a>
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Therapies;
