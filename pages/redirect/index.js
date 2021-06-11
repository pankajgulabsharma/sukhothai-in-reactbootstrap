import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";

function TransactionStatus({ checksum, authdesc }) {
  // pradip handle styling
  if (checksum === "true" && authdesc === "Y") {
    return (
      <Card>
        <div></div> // check icon
        <h5>Payment Successful</h5>
        <p>
          Thank you for shopping with us. Your credit card has been charged and
          your transaction is successful. We will be shipping your order to you
          soon.
        </p>
      </Card>
    );
  } else if (checksum === "true" && authdesc === "N") {
    return (
      <Card>
        <div></div> // check icon
        <h5>Transaction Failed</h5>
        <p>
          Thank you for shopping with us. However,the transaction has been
          declined.
        </p>
      </Card>
    );
  } else if (checksum === "true" && authdesc === "B") {
    return (
      <Card>
        <div></div> // check icon
        <h5>Payment Successful</h5>
        <p>
          Thank you for shopping with us.We will keep you posted regarding the
          status of your order through e-mail
        </p>
      </Card>
    );
  } else {
    return (
      <Card>
        <div></div> // check icon
        <h5>Transaction Failed</h5>
        <p>Security Error. Illegal access detected</p>
      </Card>
    );
  }
}

function Redirect({ params }) {
  const router = useRouter();
  // console.log(router.query);
  return (
    <Container fluid>
      <Row>
        <Col sm={12} lg={{ span: 6, offset: 3 }}>
          <TransactionStatus {...router.query} />
        </Col>
      </Row>
    </Container>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      params: JSON.stringify(context),
    },
  };
}

export default Redirect;
