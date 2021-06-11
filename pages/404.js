import { Container, Row, Col } from "react-bootstrap";
import Seo from "../components/seo";

export default function Custom404() {
    return (
        <>
          <Seo pageTitle="Page not found" />
          <div>
            <Container>
              <Row>
                <Col xs={12} md={7} className="text-center">
                  <p>404</p>
                </Col>
                <Col xs={8} md={5}>
                  <h1>Sorry...</h1>
                  <h4>This page could not be found</h4>
                </Col>
              </Row>
            </Container>
          </div>
        </>
    );
}
