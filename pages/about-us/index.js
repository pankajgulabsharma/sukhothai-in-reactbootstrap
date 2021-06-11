import { Container, Row, Col, Image } from "react-bootstrap";
import dynamic from 'next/dynamic';

import styles from "./index.module.scss";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

function AboutUs({aboutBanner, activeNav}) {
    
    const filterData = aboutBanner?.data.filter((data) => data.Pages === activeNav);
    
    return (
        <>
          <picture className="page-banner">
            <source media="(min-width: 768px)" srcSet={filterData[0].bannerImage} />
            <DynamicImage src={filterData[0].bannerImage} className="w-100" alt="Sukhothai" />
          </picture>
          <main className="main-content">
            <Container>
              <div className="section-block">
                <div className="block-heading-box">
                  <h2 className="block-title block-title--with-border text-center">{filterData[0].pageHeader}</h2>
                </div>
                <Row>
                  {
                      filterData[0]?.subContent.map((data, index) => {
                          return(
                              <>
                                <Col lg={8} md={7} xs={12} key={index}>
                                  <div dangerouslySetInnerHTML={{__html: data.subContent}} />
                                </Col>
                                <Col lg={4} md={5} xs={12}>
                                  <ul className="about-us-gallery-lists list-unstyled">
                                    <li>
                                      <DynamicImage src={data.subContentImg} className="w-100" alt="Sukhothai" />
                                    </li>
                                  </ul>
                                </Col>
                              </>
                          );
                      })
                  }
                </Row>
              </div>
            </Container>
          </main>
        </>
    );
}

export async function getStaticProps() {

    const res = await fetch('http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData');
    const response = await res.json();
    
    return {
        props: {
            aboutBanner: response,
            activeNav: "ABOUT US",
        },
    };
}

export default AboutUs;
