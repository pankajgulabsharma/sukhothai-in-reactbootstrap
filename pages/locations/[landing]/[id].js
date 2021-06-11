import { Container, Row, Col, Card, Image } from "react-bootstrap";
import dynamic from "next/dynamic";

const DynamicImage = dynamic(
  () => import("../../../components/custom-image"),
  <div>...loading</div>
);

function LocationIdPage({ locationData }) {
  const { result } = locationData;

  return (
    <>
      <picture className="page-banner">
        <source
          media="(min-width: 768px)"
          srcset="/images/page-banner/health-benefits.jpg"
        />
        <DynamicImage
          src="/images/page-banner/health-benefits.jpg"
          className="w-100"
          alt="Sukhothai"
        />
      </picture>

      <section className="section-block">
        <div className="block-heading-box">
          <h2 className="block-title block-title--with-border text-center">
            {`SUKHO THAI ${result.ST_LOCN} ${result.F_CITY} - ${result.ST_BRN}`}
          </h2>
        </div>
        <Container>
          <Row>
            <Col md={4}>
              <div>
                <div className="icon-box d-flex align-items-center justify-content-center">
                  <i className="st-icon-location-pin"></i>
                </div>
                <address>{result.ST_ADD}</address>
              </div>

              <div className="contact-box">
                <div className="icon-box d-flex align-items-center justify-content-center">
                  <i className="st-icon-call"></i>
                </div>
                <p>
                  <a
                    href={`tel:${result.F_SHORTMOB}`}
                    className="text-primary border-animation border-animation--secondary"
                  >
                    {result.F_SHORTMOB}
                  </a>
                </p>
              </div>
              <div>
                <h5>Amenities:</h5>
                {result.amenities.map((listData, index) => (
                  <ul
                    key={index}
                    className="bullet-list bullet-list--primary list-unstyled"
                  >
                    <li>{listData}</li>
                  </ul>
                ))}
              </div>
            </Col>
            <Col md={4}>
              <iframe
                _ngcontent-sukhothai-universal-c385=""
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.6388494117605!2d72.84088711482313!3d19.0356293581871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ced32b8f15e5%3A0xf06edb722a432d6c!2sSukho+Thai+Spa!5e0!3m2!1sen!2sin!4v1482162922082"
                width="600"
                height="450"
                frameborder="0"
                allowfullscreen=""
                className="w-100 mt-3 mt-md-0"
              ></iframe>
            </Col>
            <Col md={4}>
              <Card className="card card--img-animation h-100">
                <div className="card-img-top">
                  <DynamicImage
                    src={result.image}
                    alt={result.imageTitle}
                    className="h-100 w-100"
                  />
                </div>
                <Card.Body>
                  <Card.Title>ABOUT SUKHOTHAI SPA</Card.Title>
                  <Card.Text>
                    Established in 2010, Sukho Thai is India's premier Foot
                    Therapy brand inspired from the deeply rooted cultures of
                    Thailand. The seemingly small nation has a great culture and
                    is home to exotic fruits and flowers. The word ‘Sukho’ is
                    derived from the Sanskrit word ‘Sukh’ which connotes
                    happiness and ‘Thai’ reflects its innate bond with Thailand.
                    With over 15 outlets spanning across Mumbai, Pune and Goa,
                    Sukho Thai is the first international foot massages spa
                    chain to open a series of outlets in India.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "http://login.sukhothai.in/route/spaLocationST/locationList"
  );
  const locationUrl = await res.json();

  const xData = locationUrl.map((data) => {
    return data.DATA.map((val) => val);
  });
  console.log(xData);
  console.log("========================");
  const merged = [].concat.apply([], xData);
  console.log(merged);
  const paths = merged.map((urlData) => {
    return {
      params: { landing: urlData.F_CITY, id: urlData.ST_BRN },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://login.sukhothai.in/route/spaLocationST/getDataByBranchCode/${encodeURI(
      params.id
    )}`
  );
  const locationData = await res.json();

  return {
    props: {
      locationData,
      activeNav: "LOCATIONS",
    },
  };
}

export default LocationIdPage;
