import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import { validateArray } from "../../utilities/validators";
import styles from "./index.module.scss";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <Container>
            <Row>
              <Col lg={6} xs={12} className="mb-5 mb-lg-0">
                <h3 className="block-title">About Us</h3>
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
                <address className="mb-0">
                  <span>02/A, Jyoti Sadan, Mahim, Mumbai</span>
                  <span>
                    <a href="tel:+919821008877" className="text-link-primary">
                      <span className="border-animation border-animation--primary">
                        +(91) 982 100 8877
                      </span>
                    </a>
                  </span>
                  <span>
                    <a
                      href="mailto:feedback@sukhothai.in"
                      className="text-link-primary"
                    >
                      <span className="border-animation border-animation--primary">
                        feedback@sukhothai.in
                      </span>
                    </a>
                  </span>
                </address>
              </Col>
              <Col lg={3} md={6} sm={5} xs={12} className="mb-5 mb-sm-0">
                <h3 className="block-title">Useful links</h3>
                <ul className="footer-menu bullet-list bullet-list--primary list-unstyled">
                  <li>
                    <a
                      href="/home"
                      className="border-animation border-animation--primary"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="about-us"
                      className="border-animation border-animation--primary"
                    >
                      About SukhoThai
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blogs"
                      className="border-animation border-animation--primary"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="/locations"
                      className="border-animation border-animation--primary"
                    >
                      Location Maps
                    </a>
                  </li>
                  <li>
                    <a
                      href="/benefits"
                      className="border-animation border-animation--primary"
                    >
                      Benefits
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="border-animation border-animation--primary"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </Col>
              <Col lg={3} md={6} sm={7} xs={12} className="mb-5 mb-sm-0">
                <h3 className="block-title">Let's Connect</h3>
                <ul className="social-links bounce-animation list-unstyled">
                  <li>
                    <a
                      className="social-links__link social-links__fb"
                      href="https://www.facebook.com/MySukhoThai"
                      target="_blank"
                    >
                      <i className="st-icon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-links__link social-links__yt"
                      href="https://www.youtube.com/channel/UCpPdd1kD69uIISwf1IkNqFQ"
                      target="_blank"
                    >
                      <i className="st-icon-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-links__link social-links__insta"
                      href="https://instagram.com/mysukhothai/"
                      target="_blank"
                    >
                      <i className="st-icon-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-links__link social-links__twitter"
                      href="https://twitter.com/mysukhothai"
                      target="_blank"
                    >
                      <i className="st-icon-twitter"></i>
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p className="copyright-text text-center mb-0">
              Copyrights © 2020 - Sukho Thai India Pvt. Ltd. - All Rights
              Reserved
            </p>
          </div>
        </div>
      </footer>
      <a
        className="chat-whatsapp"
        target="_blank"
        href="https://api.whatsapp.com/send?phone=919870989740"
      >
        <i className="st-icon-whatsapp"></i>
      </a>
    </>
  );
}

export default Footer;
