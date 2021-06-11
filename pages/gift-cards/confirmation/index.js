import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

import styles from "./index.module.scss";

function Confirmation(){
    return (
        <Container fluid>
          <Row>
            <Col className={""} sm={12} md={{ span: 10, offset: 1 }} lg={{span: 8, offset: 2}}>

              {/* Title and subtitle */}
              
              <h3 className="pink text-center py-2 mt-5" id="title">
                Buy Gift Cards <sup>TM</sup>
              </h3>
              <div className="shortBorderBottom"></div>
              <div className="yellow text-center mb-5" id="subtitle">
                Our most popular unique Gift Cards for some one you love.
              </div>
              <p>
                We Guarantee a memorable experience for your loved ones for this
                gift card.
              </p>
              <p>
                A gift valued by everyone, no matter their taste and
                preferences. We offer corporate gift vouchers for companies,
                organizations and individuals. Spa Therapy Gifts are the best
                solutions as a business gift, incentives or rewards.
              </p>
              <p>
                Simply you have to select a Spa Therapy from our wide option for
                gifting and make them Feel Happy. After selection you can see
                the other transaction details on the right side to proceed.
              </p>

              <h3 className="yellow text-center my-5">Electronic Gift Card Details</h3>

              <Table className={`${styles.table}`}>
                <thead>
                  <tr>
                    <th className="text-center">CODE</th>
                    <th className="text-left">THERAPY TYPE</th>
                    <th className="text-center">INR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">code</td>
                    <td className="text-left">type</td>
                    <td className="text-center">inr</td>
                  </tr>
                </tbody>
              </Table>

              <Table className={`${styles.recheck}`}>
                <thead>
                  <tr>
                    <th className="text-center" colSpan="3">
                      Please recheck the details and reconfirm
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="3">
                      Details of person gifting the card
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Gift Type: type
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Control disabled className={`${styles.input}`} />
                    </td>
                    <td>
                      <Form.Control disabled className={`${styles.input}`} />
                    </td>
                    <td>
                      <Form.Control disabled className={`${styles.input}`} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Informaion of the person receiving the Gift Card
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Control disabled className={`${styles.input}`} />
                    </td>
                    <td>
                      <Form.Control disabled className={`${styles.input}`} />
                    </td>
                    <td>
                      <Form.Control disabled className={`${styles.input}`} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Button size="md" block>
                        Confirm
                      </Button>
                    </td>
                    <td colSpan="2">
                      <Button size="md" variant="light">
                        Cancel
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              
            </Col>
            <Col sm={12} md={{ span: 10, offset: 1 }} lg={{span: 8, offset: 2}} className="mb-2">
              When this gift card is presented at any of the SukhoThai spa it will carry the value you purchase now or it will be
              valued for Therapy selected. In case any less value is used by the gift card holder, then remaining value is carried
              forward on this card.
            </Col>
            <Col sm={12} md={{ span: 10, offset: 1 }} lg={{span: 8, offset: 2}} className="mb-5">
              <Form.Text>
                <span className={`${styles.pink}`}>Please Note: </span>
                Spa Treatment will be provided subject to the Realisation of payment. Bank usually take 3 days from date of
                transaction to credit the amout to our account.
              </Form.Text>
            </Col>
          </Row>
        </Container>
    );
}

export default Confirmation;
