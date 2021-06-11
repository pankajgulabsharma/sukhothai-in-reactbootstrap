import { Container, Row, Col, Image } from "react-bootstrap";
import dynamic from 'next/dynamic';
import styles from "./index.module.scss";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

function CorporateTieUp({ corporateBanner, activeNav }) {
    const filterData = corporateBanner?.data.filter((data) => data.Pages === activeNav);

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
                          return (
                              <>
                                <Col md={6} xs={12} className="mb-5 mb-ms-0">
                                  <ul className="about-us-gallery-lists list-unstyled">
                                    <li>
                                      <DynamicImage src={data.subContentImg} className="w-100" alt="Sukhothai" />
                                    </li>
                                  </ul>
                                </Col>
                                <Col md={6} xs={12}>
                                  <div dangerouslySetInnerHTML={{ __html: data.subContent }} />
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
            corporateBanner: response,
            activeNav: "CORPORATE TIE-UP",
        },
    };
}

export default CorporateTieUp;
