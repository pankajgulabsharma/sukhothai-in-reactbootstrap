import { Container } from "react-bootstrap";
import dynamic from "next/dynamic";
import Therapies from "../../components/customcard";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

export default function TherapiesPage({ therepiesData }) {
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
          <main className="main-content">
            <Container>
              <Therapies
                therapiesUrl="/therapies/"
                data={therepiesData.result}
                title="Our Wellness Therapies"
                content="Unwind in the air of peace and tranquility at our luxury spa"
              />
            </Container>
          </main>
        </>
    );
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch(
        "http://login.sukhothai.in/route/therapiesST/therapies"
    );
    const therepiesData = await res.json();
    return {
        props: {
            therepiesData,
            activeNav: "THERAPIES"
        }
    };
}
