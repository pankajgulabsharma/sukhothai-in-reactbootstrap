// const { Container, Row, Col, Card, Image } = require("react-bootstrap");
// import dynamic from "next/dynamic";

// const DynamicImage = dynamic(
//   () => import("../../../components/custom-image"),
//   <div>...loading</div>
// );

// function LocationLandingPage({ locationData, params }) {
//   const xData = locationData.map((data) => {
//     return data.DATA.map((val) => val);
//   });

//   var merged = [].concat.apply([], xData);

//   const filterLocation = locationData.filter(
//     (data) => data._id.city === params.landing
//   );

//   return (
//     <>
//       <picture className="page-banner">
//         <source
//           media="(min-width: 768px)"
//           srcset="/images/page-banner/health-benefits.jpg"
//         />
//         <DynamicImage
//           src="/images/page-banner/health-benefits.jpg"
//           className="w-100"
//           alt="Sukhothai"
//         />
//       </picture>

//       <section className="section-block">
//         <div className="block-heading-box">
//           <h2 className="block-title block-title--with-border text-center">
//             {filterLocation[0]?._id?.city}
//           </h2>
//         </div>
//         <Container>
//           <Row>
//             {filterLocation[0]?.DATA.map((cardData, index) => {
//               return (
//                 <Col md={4} key={index} key={index}>
//                   <Card className="card card--img-animation h-100">
//                     <div className="card-img-top">
//                       <DynamicImage
//                         src={cardData.image}
//                         alt={cardData.imageTitle}
//                         className="h-100 w-100"
//                       />
//                     </div>
//                     <Card.Body>
//                       <Card.Title>{`SUKHO THAI ${cardData.ST_LOCN} ${cardData.F_CITY} - ${cardData.ST_BRN}`}</Card.Title>
//                       <h5>Amenities:</h5>
//                       {cardData.amenities.map((listData, index) => (
//                         <ul
//                           key={index}
//                           className="bullet-list bullet-list--primary list-unstyled"
//                         >
//                           <li>{listData}</li>
//                         </ul>
//                       ))}
//                     </Card.Body>
//                     <Card.Footer className="text-center">
//                       <Card.Link
//                         className="btn btn-text"
//                         href={`/locations/${cardData.F_CITY}/${cardData.ST_BRN}`}
//                       >
//                         Read More
//                       </Card.Link>
//                     </Card.Footer>
//                   </Card>
//                 </Col>
//               );
//             })}
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch(
//     "http://login.sukhothai.in/route/spaLocationST/locationList"
//   );
//   const locationUrl = await res.json();

//   const paths = locationUrl?.map((url) => ({
//     params: { landing: url._id.city },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// // This function gets called at build time
// export async function getStaticProps({ params }) {
//   // Call an external API endpoint to get posts
//   const res = await fetch(
//     "http://login.sukhothai.in/route/spaLocationST/locationList"
//   );
//   const locationData = await res.json();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       locationData,
//       params,
//       activeNav: "LOCATIONS",
//     },
//   };
// }

// export default LocationLandingPage;
