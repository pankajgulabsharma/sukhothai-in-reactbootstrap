import { Image, Container, Row, Col, Card } from "react-bootstrap";
import dynamic from 'next/dynamic';

import styles from "./index.module.scss";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

function OfferLandingPage({ offerData, bannerData, activeNav }) {

    const filterData = bannerData?.data.filter((data) => data.Pages === activeNav);
    
    return (
        <>
	  <picture className="page-banner">
            <source media="(min-width: 768px)" srcset={filterData[0].bannerImage} />
            <DynamicImage src={filterData[0].bannerImage} className="w-100" alt="Sukhothai" />
          </picture>
          <main className="main-content">
            <Container>
              <div className="section-block">
                <div className="block-heading-box">
                  <h2 className="block-title block-title--with-border text-center">{offerData.result.title}</h2>
                </div>
		<div className="offer-top-row d-flex align-items-center mb-5">
		  <div className="offer-top-row__img-box">
		    <DynamicImage src={offerData.result.image} alt="Sukhothai Offers" />
		  </div>
		  <div className="offer-top-row__text">
		    <p 
		      className="mb-0"
		      dangerouslySetInnerHTML={{
			  __html: offerData.result.description,
		      }}
		    ></p>
		  </div>
		</div>
		<div className="block-heading-box">
		  <h3 className="block-title text-center">Avail the above Offer at</h3>
		</div>
		<ul className="offer-details-list three-col-layout list-unstyled mobile-hz-scroll list-unstyled">
		  {offerData.result.branch?.map((cardData, index) => {
		      return (
			  <li>
			    <Card className="card--img-animation h-100">
			      <div className="card-img-top">
				<span className="card__badge">{cardData.branchCode}</span>
				<DynamicImage
				  src={cardData.branchImage}
				  alt={cardData.branchName}
                                  className="w-100 h-100"
				/>
			      </div>
			      <Card.Body className="text-left">
				<Card.Title>{cardData.branchName}</Card.Title>
				<ul className="contact-lists list-unstyled">
				  <li>
				    <span className="contact-lists__icon-box">
				      <i className="st-icon-location-pin"></i>
				    </span>
				    <div>{cardData.branchAddress}</div>
				  </li>
				  <li className="align-items-center">
				    <span className="contact-lists__icon-box">
				      <i className="st-icon-call"></i>
				    </span>
				    <a className="border-animation border-animation--secondary"
                                       href="tel:{cardData.branchContactNumber}">
                                      {cardData.branchContactNumber}
                                    </a>
				  </li>
				</ul>
			      </Card.Body>
			    </Card>
			  </li>
		      );
		  })}
		</ul>
	      </div>
	    </Container>
	  </main>
        </>
    );
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch("http://login.sukhothai.in/route/SPAOfferST/list");
    const offerUrl = await res.json();

    const paths = offerUrl?.map((url) => ({
        params: { landing: url.title.replace(/ /g, "-") },
    }));

    return {
        paths,
        fallback: false,
    };
}

// This function gets called at build time
export async function getStaticProps({ params }) {
    // Call an external API endpoint to get posts
    const res = await fetch(
        `http://login.sukhothai.in/route/SPAOfferST/SPAOffers/${params.landing.replace(
      /-/g,
      " "
    )}`
    );
    const offerData = await res.json();

    const res2 = await fetch('http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData');
    const response2 = await res2.json();

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            offerData,
            activeNav: "OFFERS", 
        },
    };
}

export default OfferLandingPage;
