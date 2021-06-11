import { Container, Image} from "react-bootstrap";
import dynamic from 'next/dynamic';
import CelebCard from "../../components/celeb-card";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

function CelebTalkPage({ celebData, celebBanner, activeNav }) {
    const filterData = celebBanner?.data.filter((data) => data.Pages === activeNav);
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
                <CelebCard 
                  data={celebData} 
                />
              </div>
            </Container>
          </main>
        </>
    );
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://login.sukhothai.in/route/celebTalks');
    const res1 = await fetch('http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData');
    const celebData = await res.json();
    const response = await res1.json();

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            celebData,
            celebBanner: response,
            activeNav: "CELEB TALK",
        },
    };
}

export default CelebTalkPage;
