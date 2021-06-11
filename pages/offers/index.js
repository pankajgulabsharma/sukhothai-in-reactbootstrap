import { Container, Image } from "react-bootstrap";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { validateArray } from "../../utilities/validators";
import Offers from "../../components/offers";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <p>...loading</p>);

export default function OffersPage({ 
    offerData,
    bannerData,
    activeNav
}) {
    
    const filterData = bannerData?.data.filter((data) => data.Pages === activeNav);
    
    return (
        <>
          <picture className="page-banner">
            <source media="(min-width: 768px)" srcSet={filterData[0].bannerImage} />
            <DynamicImage src={filterData[0].bannerImage} className="w-100" alt="Sukhothai" />
          </picture>
          <main className="main-content">
            <Container>
              <Offers
                title="Special Offers"
                content="Offers of the day"
                data={offerData}
              />
            </Container>
          </main>
        </>
    );
}

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://login.sukhothai.in/route/SPAOfferST/list');
    const offerData = await res.json();

    const res2 = await fetch('http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData');
    const response2 = await res2.json();

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            offerData,
            activeNav: "OFFERS",
            bannerData: response2
        },
    };
}
