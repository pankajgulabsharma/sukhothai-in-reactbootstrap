import { useState } from "react";
import { Pagination, Card, Col, Row } from "react-bootstrap";
import Link from "next/link";
import dynamic from 'next/dynamic';

import styles from "./index.module.scss";

const DynamicImage = dynamic(() => import("../custom-image"), <div>...loading</div>);

const BlogCard = ({ data }) => {
  const [arr, setArr] = useState(data.slice(0, 6));
  let active = 1;
  let items = [];

  for (let i = 1; i <= 6; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={active === i}
        onClick={() => {
          setArr(data.slice(i * 6 - 6, i * 6));
        }}
      >
        {i}
      </Pagination.Item>
    );
  }
  return (
    <>
      <Row>
        {arr?.map((cardData, index) => {
          let dateString = new Date();
          if (cardData?.date) {
            const date = new Date(cardData?.date);
            dateString = date.getDate() + " " + date.toLocaleDateString('default', { month: "short" });
          }

          return (
            <Col lg={6} xs={12} className="mb-5" key={index}>
              <Card className="card card--img-animation h-100" key={index}>
                <Link href={`blogs/${cardData.title.replace(/ /g, "-")}`}>
                  <a className="card-img-top">
                    {cardData?.date && <span className="card__badge">{dateString}</span>}
                    <DynamicImage src={cardData.image} alt={cardData.altText} className="h-100 w-100" />
                  </a>
                </Link>
                <Card.Body>
                  <h3 className="card-title">{cardData.name || cardData.title}</h3>
                  <Card.Text>{cardData.excerpt || cardData.title}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link href={`blogs/${cardData.title.replace(/ /g, "-")}`}>
                    <a className="btn btn-text">Read More</a>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Pagination className="mb-5 mb-md-0">
        <Pagination.First />
        {items}
        <Pagination.Last />
      </Pagination>
    </>
  );
};

export default BlogCard;
