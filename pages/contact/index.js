import { Container, Row, Col, Image } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import GoogleMapReact from 'google-map-react';

import styles from "./index.module.scss";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

function Contact({contact}){

    const mapOptions = {
        disableDefaultUI: true,
        mapTypeControl: true,
        streetViewControl: true,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
    
    function ContactCard({icon, text, email, phone, callText, name}){
        return (
            <div className="contact-box">
              <div className="icon-box d-flex align-items-center justify-content-center">
                <i className="st-icon-envelop"></i>
              </div>
              {text && <div>{text}</div> }
              {name && <div><strong>{name}</strong></div>}
              {email && <a className="text-primary border-animation border-animation--secondary" href={`mailto:${email}`}>{email}</a>}
              {phone && 
               <div>
                 <strong>{callText ? callText : "Call: "}</strong>
                 <a className="text-primary border-animation border-animation--secondary" href={`tel:${phone}`}>{phone}</a>
               </div>
              }
            </div>
        );
    }
    
    return (
        <>
          <picture className="page-banner">
            <source media="(min-width: 768px)" srcset="/images/page-banner/contact-us.jpg" />
            <DynamicImage src="/images/page-banner/contact-us.jpg" className="w-100" alt="Sukhothai" />
          </picture>
          <main className="main-content contact-us-page">
            <Container>
              <div className="section-block">
                <div className="block-heading-box">
                  <h2 className="block-title block-title--with-border text-center">Get In Touch With Us</h2>
                </div>
                <Row>
                  <Col md={3} sm={6} xs={12}>
                    <div className="contact-box">
                      <div className="icon-box d-flex align-items-center justify-content-center">
                        <i className="st-icon-location-pin"></i>
                      </div>
                      <address>Jyoti Sadan, 2A Ground Floor, Shitaladevi Temple Road, Mahim, Mumbai - 400 016</address>
                    </div>
                  </Col>
                  <Col md={3} sm={6} xs={12}>
                    <div className="contact-box">
                      <div className="icon-box d-flex align-items-center justify-content-center">
                        <i className="st-icon-call"></i>
                      </div>
                      <p>If you have questions or need additional information,
                        <br/>Please call Us:
                        <a href="tel:+919821008877"
                           className="text-primary border-animation border-animation--secondary">+919821008877</a></p>
                    </div>
                  </Col>
                  <Col md={6} xs={12}>
                    <iframe _ngcontent-sukhothai-universal-c385="" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.6388494117605!2d72.84088711482313!3d19.0356293581871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ced32b8f15e5%3A0xf06edb722a432d6c!2sSukho+Thai+Spa!5e0!3m2!1sen!2sin!4v1482162922082" width="600" height="250" frameborder="0" allowfullscreen=""
                            className="w-100 mt-3 mt-md-0"></iframe>
                  </Col>
                </Row>
                <Row className="mt-5">
                  {
                      contact.map((fields, index) => {
                          return (
                              <Col sm={12} md={6} lg={3} key={fields.id}>
                                <ContactCard {...fields} />
                              </Col>
                          );
                      })
                  } 
                </Row>
              </div>
            </Container>
          </main>
        </>
    );
}

export async function getStaticProps(){
    return {
        props: {
            activeNav: "CONTACT",
            contact: [
                {
                    id: 1,
                    icon: "",
                    text: "For Feedback contact",
                    email: "feedback@sukhothai.in",
                    phone: "+919870989740",
                },
                {
                    id: 2,
                    icon: "",
                    text: "For Franchise contact",
                    name: "Ashwin D'costa",
                    email: "sukhothai.ashwin@gmail.com",
                    phone: "+919930922284",
                },
                {
                    id: 3,
                    icon: "",
                    text: "For Marketing & PR contact",
                    email: "sukhothaimarketing@sukhothai.in",
                    phone: "+919821602020",
                    callText: ""
                },
                {
                    id: 4,
                    icon: "",
                    text: "For Career contact",
                    email: "hr@sukhothai.in",
                    phone: "+919870989740",
                    callText: ""
                },
            ]
        }
    };
}

export default Contact;
