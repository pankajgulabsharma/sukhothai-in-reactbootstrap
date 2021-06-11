import { useState, Component, useEffect, useRef } from "react";
import Carousel from "../../components/Carousel";
import Therapies from "../../components/customcard";
import CardSliderPanel from "../../components/card-slider";
import Offers from "../../components/offers";
import TestimonialCarousel from "../../components/TestimonialCarousel";
import LocationCard from "../../components/location-card";
import GoogleMapReact from "google-map-react";
import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import haversineDistance from "haversine-distance";
import Link from "next/link";
import { Container, Col, Row, Modal, Form, ListGroup } from "react-bootstrap";
import dynamic from "next/dynamic";
import useForm from "./useForm";

import styles from "./index.module.scss";

const DynamicImage = dynamic(
  () => import("../../components/custom-image"),
  <div>...loading</div>
);

const AnyReactComponent = ({ text }) => <h3 className="text-danger">{text}</h3>;

class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = { address: "", coords: "", name: "" };
    this.hookAddressHandler = props.handleInputChange; // binds hook handler with internal handler
    this.hookSelectHandler = props.handleSelectChange; // same as above
  }

  handleChange = address => {
    this.setState({ address: address });
    this.hookAddressHandler(address);
  };

  handleSelect = address => {
    this.hookSelectHandler(address);
  };

  render() {
    return (
      <>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input form-control"
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";

                  const style = suggestion.active
                    ? {
                        backgroundColor: "white",
                        color: "black",
                        cursor: "pointer"
                      }
                    : {
                        backgroundColor: "white",
                        color: "black",
                        cursor: "pointer"
                      };
                  return (
                    <div
                      key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </>
    );
  }
}

function Spalocations({ locations }) {
  if (locations) {
    return (
      <ListGroup className={styles.locations}>
        {locations.map((spa, index) => (
          <ListGroup.Item className={styles.location} key={index}>
            <div className={styles.head}>
              <h3>
                <span>Sukhothai</span> {spa.location}
              </h3>
            </div>
            <p>{spa.address}</p>
            <p>{spa.city}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  } else {
    return null;
  }
}

const options = {
  distances: [
    {
      name: "10",
      value: 10
    },
    {
      name: "25",
      value: 25
    },
    {
      name: "50",
      value: 50
    },
    {
      name: "100",
      value: 100
    },
    {
      name: "200",
      value: 200
    },
    {
      name: "500",
      value: 500
    },
    {
      name: "500+",
      value: null
    }
  ]
};

export default function Home({
  bannerData,
  therapiesData,
  locationData,
  offerData,
  blogData,
  healthBenefitData,
  testimonalData,
  spaLocationData
}) {
  const [loc, setLoc] = useState({});
  const [spaLocs, setSpaLocs] = useState(
    spaLocationData.map((spa, index) => ({
      code: spa.ST_BRN,
      location: spa.ST_LOCN,
      address: spa.F_SHORTADD,
      city: spa.F_CITY,
      latlng: { lat: parseFloat(spa.latitude), lng: parseFloat(spa.longitude) },
      phone: spa.ST_MOB
    }))
  );

  const [filteredLocs, setFilteredLocs] = useState(spaLocs);

  // get current position
  useEffect(() => {
    if (process.browser) {
      window.navigator.geolocation.getCurrentPosition(pos => {
        setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  // get distances from current pos
  useEffect(() => {
    setSpaLocs(
      spaLocs.map((spa, index) => {
        return {
          ...spa,
          distanceFromCurrent:
            haversineDistance(loc, {
              lat: parseFloat(spa.latlng.lat),
              lng: parseFloat(spa.latlng.lng)
            }) / 1000
        };
      })
    );
  }, [loc]);

  // FORM HOOK
  const {
    values, // form state
    handleSelect, // handles distance, results dropdowns
    address,
    handleAddressChange,
    handleLocationSelect,
    handleLocation
  } = useForm();

  const [show, setShow] = useState(false);

  // REFS

  const locationInputRef = useRef(null);

  // LIFECYCLE

  useEffect(() => {
    // filter locations from distance
    if (address.trim().length === 0) {
      setFilteredLocs(spaLocs);
    } else {
      setFilteredLocs(
        findAll(
          address.split(" ").map(str => str.toLowerCase().trim()),
          spaLocs
        )
      );
    }
  }, [address]);

  useEffect(() => {
    // get current location
    if (process.browser) {
      window.navigator.geolocation.getCurrentPosition(pos => {
        handleLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  useEffect(() => {
    // calculate all distances from current location
    setSpaLocs(
      spaLocs.map((spa, index) => {
        return {
          ...spa,
          distanceFromCurrent:
            haversineDistance(values.location, {
              lat: parseFloat(spa.latlng.lat),
              lng: parseFloat(spa.latlng.lng)
            }) / 1000
        };
      })
    );
  }, [values.location]);

  // UTILS

  function find(keywords, json) {
    // check keywords presence in root members
    if (json) {
      const fields = ["address", "city", "location"];
      const string = fields
        .map(key => json[key])
        .join("")
        .toLowerCase();
      const count = keywords.map(keyword => (string.includes(keyword) ? 1 : 0));
      const hitCounts = count.reduce((total, curr) => total + curr, 0);
      return hitCounts !== 0 ? hitCounts : false;
    } else {
      return false;
    }
  }

  function findAll(keywords, jsons) {
    // finds all [json, ...] with keywords present
    return jsons
      .map(json =>
        find(keywords, json) ? { count: find(keywords, json), value: json } : {}
      )
      .filter(x => Object.keys(x).length !== 0)
      .sort((a, b) => a.count < b.count)
      .map(x => x.value);
  }

  // HANDLERS

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <script
        async
        defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvusNIeMB8RXlFua33T6Lz0XPRUsuTrFM&libraries=places"
      ></script>
      {JSON.stringifiy}
      <Carousel data={bannerData} />
      <main className="main-content">
        <Container>
          <Therapies
            therapiesUrl="/therapies/"
            title="Our Wellness Therapies"
            content="Unwind in the air of peace and tranquility at our luxury spa"
            data={therapiesData.result}
          />
          {/* will add this section to a components folder */}
          <section className="section-block">
            <div className="block-heading-box">
              <h2 className="block-title block-title--with-border text-center">
                About Sukho Thai
              </h2>
              <p className="text-center mb-0">
                The world class Thai Foot Spa spreading Smiles & Happiness.
              </p>
            </div>
            <Row>
              <Col md={6} xs={12} className="mb-4 mb-md-0">
                <a onClick={handleShow} className="video-play-box">
                  <DynamicImage
                    src="/images/yt-banner/about-us-yt-banner.jpg"
                    alt="Sukhothai"
                    className="w-100"
                  />
                  <span className="play-btn"></span>
                </a>
              </Col>
              <Col md={6}>
                <p>
                  Established in 2010, Sukho Thai is India's premier Foot
                  Therapy brand inspired from the deeply rooted cultures of
                  Thailand. The seemingly small nation has a great culture and
                  is home to exotic fruits and flowers. The word ‘Sukho’ is
                  derived from the Sanskrit word ‘Sukh’ which connotes happiness
                  and ‘Thai’ reflects its innate bond with Thailand. With over
                  15 outlets spanning across Mumbai, Pune and Goa, Sukho Thai is
                  the first international foot massages spa chain to open a
                  series of outlets in India.
                </p>
                <div className="mt-3">
                  <Link href="/about-us">
                    <a className="btn btn-primary">Read More</a>
                  </Link>
                </div>
              </Col>
            </Row>
          </section>

          <CardSliderPanel
            title="Health Benefits Of SukhoThai Foot Massage"
            content="Unwind in an air of peace and tranquility at our luxury spa"
            data={healthBenefitData.result}
          />
          <LocationCard title="Our Spa Locations" data={locationData} />
          <Offers
            title="Special Offers"
            content="Offers of the day"
            data={offerData}
          />
          <TestimonialCarousel
            title="Testimonials"
            data={testimonalData?.data}
          />
          <Therapies
            therapiesUrl="/blogs/"
            title="Our Recent Blogs"
            data={blogData.slice(0, 3)}
            buttonBool={true}
          />
          <Row>
            <Col>
              <h1 className="text-center mb-3">Contact Us</h1>
            </Col>
          </Row>
          <Row className={styles.form}>
            {/* FORM BAR */}
            <Col sm={12} lg={{ span: 8, offset: 2 }} className={`my-5`}>
              <Form>
                <Row>
                  <Col sm={12} lg={4} className="mb-2">
                    <LocationSearchInput
                      ref={locationInputRef}
                      handleInputChange={handleAddressChange}
                      handleSelectChange={handleLocationSelect}
                    />
                  </Col>
                  <Col sm={12} lg={4} className="mb-2">
                    <Form.Control
                      name="distance"
                      className={styles.input}
                      as="select"
                      onChange={handleSelect}
                    >
                      {options.distances.map((val, index) => (
                        <option key={index} value={val.value}>
                          {val.name} km
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm={12} lg={4} className="mb-2">
                    <Form.Control
                      name="results"
                      className={styles.input}
                      as="select"
                      onChange={handleSelect}
                    >
                      {[25, 50, 75, 100].map((val, index) => (
                        <option key={index} value={val}>
                          {val}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row>
            {/* SIDE BAR */}
            <Col sm={12} lg={3}>
              <Spalocations locations={filteredLocs} />
            </Col>

            {/* MAP */}
            <Col sm={12} lg={9}>
              <div className={styles.mapContainer}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyAvusNIeMB8RXlFua33T6Lz0XPRUsuTrFM"
                  }}
                  defaultCenter={{ lat: 19.076, lng: 72.8777 }}
                  center={values.location}
                  defaultZoom={10}
                >
                  {spaLocs?.map((locdata, index) => {
                    if (
                      values.distance === null ||
                      locdata.distanceFromCurrent <= values.distance
                    ) {
                      return (
                        <AnyReactComponent
                          key={index}
                          lat={locdata.latlng.lat}
                          lng={locdata.latlng.lng}
                          text={locdata.city}
                          marker={locdata.image}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
                </GoogleMapReact>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <Modal
        show={show}
        onHide={handleClose}
        className="video-play-modal"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen=""
            src="https://www.youtube.com/embed/V90mrX3n3TA"
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "http://login.sukhothai.in/route/webBannerST/scheduler"
  );
  const res1 = await fetch(
    "http://login.sukhothai.in/route/therapiesST/therapies"
  );
  const res2 = await fetch(
    "http://login.sukhothai.in/route/spaLocationST/locationList"
  );
  const res3 = await fetch("http://login.sukhothai.in/route/SPAOfferST/list");
  const res4 = await fetch("http://login.sukhothai.in/route/blogST/blogList");
  const res5 = await fetch(
    "http://login.sukhothai.in/route/healthBenefitsST/healthBenefitsList"
  );
  const res6 = await fetch(
    "http://login.sukhothai.in/route/schema_wrapper/getDataByCollectionName/guest_testimonials"
  );
  const res7 = await fetch("http://login.sukhothai.in/route/spaLocationST/");
  const bannerData = await res.json();
  const therapiesData = await res1.json();
  const locationData = await res2.json();
  const offerData = await res3.json();
  const blogData = await res4.json();
  const healthBenefitData = await res5.json();
  const testimonalData = await res6.json();
  const spaLocationData = await res7.json();

  return {
    props: {
      bannerData,
      therapiesData,
      locationData,
      offerData,
      blogData,
      healthBenefitData,
      testimonalData,
      spaLocationData,
      activeNav: "HOME"
    }
  };
}
