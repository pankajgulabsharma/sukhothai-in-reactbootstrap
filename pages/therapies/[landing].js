import { Col, Container, Image, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

function TherapiesLandingPage({ therepiesData }) {
  return (
    <>
      <DynamicImage
        src="/images/page-banner/health-benefits.jpg"
        className="image_fluid w-100"
      />
      <Container>
        <section className="section-block">
          <div className="block-heading-box">
            <h2 className="block-title block-title--with-border text-center">
              {therepiesData.result.name}
            </h2>
            <Row>
              <Col md={8}>
                <div
                  className="mb-0"
                  dangerouslySetInnerHTML={{
                    __html: therepiesData.result.description
                  }}
                />
                <p className="text-secondary lead mb-0 mt-auto">
                  Therapy starts at Rs. {therepiesData.result.therapiestPrice}{" "}
                  for {therepiesData.result.duration}
                </p>
              </Col>
              <Col md={4}>
                <DynamicImage src={therepiesData.result.image} />
              </Col>
            </Row>
          </div>
        </section>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
    // call an external API endpoint to get paths
    const res = await fetch(
        "http://login.sukhothai.in/route/therapiesST/therapies"
    );
    const therapiesurl = await res.json();

    const paths = therapiesurl?.result.map(url => ({
        params: { landing: url.name.replace(/ /g, "-") }
    }));

    return {
        paths,
        fallback: false
    };
}

// This function gets called at build time
export async function getStaticProps({ params }) {
    // Call an external API endpoint to get posts
    const res = await fetch(
        `http://login.sukhothai.in/route/therapiesST/getTherapiesByName/${params.landing.replace(
      /-/g,
      " "
    )}`
    );
    const therepiesData = await res.json();

    return {
        props: {
            therepiesData,
            activeNav: "THERAPIES"
        }
    };
}

export default TherapiesLandingPage;
