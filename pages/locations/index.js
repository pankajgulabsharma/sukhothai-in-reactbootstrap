import { Container, Image } from "react-bootstrap";
import dynamic from 'next/dynamic';
import AccordionPage from "../../components/accordion";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

function LocationPage({ locationData, locationBanner, activeNav }) {
    const filterData = locationBanner?.data.filter(
        data => data.Pages === activeNav
    );
    return (
        <>
          <picture className="page-banner">
            <source
              media="(min-width: 768px)"
              srcSet={filterData[0].bannerImage}
            />
            <DynamicImage
              src={filterData[0].bannerImage}
              className="w-100"
              alt="Sukhothai"
            />
          </picture>
          <main className="main-content">
            <Container>
              <div className="section-block">
                <div className="block-heading-box">
                  <h2 className="block-title block-title--with-border text-center">
                    {filterData[0].pageHeader}
                  </h2>
                </div>
                <AccordionPage locationData={locationData} />
              </div>
            </Container>
          </main>
        </>
    );
}

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch(
        "http://login.sukhothai.in/route/spaLocationST/locationList"
    );
    const locationData = await res.json();

    const res1 = await fetch(
        "http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData"
    );
    const response = await res1.json();

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            locationBanner: response,
            locationData,
            activeNav: "LOCATIONS"
        }
    };
}

export default LocationPage;
