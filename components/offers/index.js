import { Card, Row, Col } from "react-bootstrap";
import dynamic from 'next/dynamic';

import styles from "./index.module.scss";

const DynamicImage = dynamic(() => import("../custom-image"), <div>...loading</div>);

const Offers = ({ data, title, content }) => {
  
  return (
    <>
      <section className="section-block">
        <div className="block-heading-box">
          <h2 className="block-title block-title--with-border text-center">
            {title}
          </h2>
          <p className="text-center mb-0">{content}</p>
        </div>
        <ul className="offer-lists four-col-layout mobile-hz-scroll list-unstyled mb-0">
          {
            data.map((offerData, index) => (
                <li key={index}>
                <Card className="card card--transparent card--offers-lists h-100">
                  <a href={`/offers/${offerData?.title?.replace(/ /g,"-")}`} className="card-img-top h-auto">
                    <DynamicImage src={offerData.image} alt="" className="h-100 w-100" />
                  </a>
                  <Card.Body>
                    <Card.Text>{offerData.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <p className="m-0 p-0">Call us on :</p>
                    <a href="tel:98210088" className={styles.card_link_color}>
                      {offerData.telephoneNumber}
                    </a>
                  </Card.Footer>
                </Card>
              </li>
            ))
          }  
        </ul>
      </section>
    </>
  );
};

export default Offers;
