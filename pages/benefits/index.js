import { Card, Col, Container, Row, Image } from "react-bootstrap";
import dynamic from 'next/dynamic';

import styles from "../../components/card-slider/index.module.scss";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

const BenefitPage = ({ benefitsBanner, healthBenefitData, activeNav }) => {

    // const filterData = benefitsBanner?.data.filter((data) => data.Pages === activeNav);

    if (!healthBenefitData) return null;

    return (
        <>
          <DynamicImage src={""} className="image_fluid w-100" />
          <Container>
            <Row>
              <Col md={12}>
                <h2 className="block-title block-title--with-border text-center">
                  Health Benefits Of Thai Foot Massages
                </h2>
                <p className="text-center">
                  Unwind in an air of peace and tranquility at our luxury spa
                </p>
              </Col>
              {
                  healthBenefitData?.result?.map((cardData, index) => {
                      return (
                          <Col md={4} key={cardData._id}>
                            <Card className="text-center">
                              <div style={{ overflow: "hidden" }}>
                                <DynamicImage
                                  className="h-100 w-100"
                                  variant="top"
                                  src={cardData.image}
                                  alt={cardData.altText}
                                />
                              </div>
                              <Card.Body className={styles.card_body_color}>
                                <strong>
                                  <h5 className={`text-uppercase ${styles.card_title_color}`}>
                                    {cardData.name}
                                  </h5>
                                </strong>
                                <Card.Text className={styles.card_text_color}>
                                  {cardData.description}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                      );
                  })
              }
            </Row>
          </Container>
        </>
    );
};


// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://login.sukhothai.in/route/healthBenefitsST/healthBenefitsList');
    const healthBenefitData = await res.json();

    const res2 = await fetch('http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData');
    const response2 = await res2.json();
    
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            healthBenefitData,
            bannerData: response2,
            activeNav: "THERAPIES"
        },
    };
}

export default BenefitPage;
