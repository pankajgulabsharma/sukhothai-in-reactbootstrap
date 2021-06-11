import { Container, Row, Col } from "react-bootstrap";
import Seo from "../components/seo";

const pageStyle = {
    paddingTop        : '125px',
    minHeight         : 'calc(100vh)',
    background: 'rgba(0, 0, 0, 0.32)',
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize    : 'cover',
};

export default function Custom500() {
    return (
        <>
          <Seo pageTitle="Internal Server Error" />
          <div>
            <Container>
              <Row>
                <Col xs={12} md={7} className="text-center">
                  <p>500</p>
                </Col>
                <Col xs={8} md={5}>
                  <h1>Sorry...</h1>
                  <h4>Internal Server Error</h4>
                </Col>
              </Row>
            </Container>
          </div>
        </>
    );
}
