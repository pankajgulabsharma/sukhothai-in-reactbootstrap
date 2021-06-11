import { Container, Image } from "react-bootstrap";
import dynamic from "next/dynamic";
import LocationCard from "../../components/location-card";

const DynamicImage = dynamic(
  () => import("../../components/custom-image"),
  <div>...loading</div>
);

const imgArray = [
  {
    image: "/images/st-cards/gift-card.jpg",
    altText: "gift-cards",
    name: "Gift Card"
  },
  {
    image: "/images/st-cards/gift-card.jpg",
    altText: "priority-cards",
    name: "Priority Card"
  }
];

function CardPage({ cardBanner, activeNav }) {
  const filterData = cardBanner?.data.filter(data => data.Pages === activeNav);
  return (
    <>
      <picture className="page-banner">
        <source media="(min-width: 768px)" srcSet={filterData[0].bannerImage} />
        <DynamicImage
          src={filterData[0].bannerImage}
          className="w-100"
          alt="Sukhothai"
        />
      </picture>
      <LocationCard on_hover={false} title="Cards" data={imgArray} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData"
  );
  const response = await res.json();

  return {
    props: {
      cardBanner: response,
      activeNav: "CARD"
    }
  };
}

export default CardPage;
