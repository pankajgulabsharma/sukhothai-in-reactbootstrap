import {
  Table,
  Form,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import useForm from "./useForm.js";
import validate from "./validateInfo.js";

import styles from "./index.module.scss";

const DynamicImage = dynamic(
  () => import("../../components/custom-image"),
  <p>...loading</p>
);

function PriorityCards({ cards, bannerData, activeNav }) {
  const [selected, setSelected] = useState({});

  const {
    values,
    errors,
    submit,
    setSubmit,
    handleChange,
    handleCheck,
    handleSubmit,
    handleRadio,
    validateValues,
  } = useForm(cards, validate);

  const tableHead = ["Plan", "Pay Only", "Get Value", "Save", ""];
  const tableData = cards;

  useEffect(() => {
    setSelected(cards.filter((card) => card.plan === values.plan)[0]);
    validateValues();
    console.log("useEffect");
  }, [values.plan, values]);

  const filterData = bannerData?.data.filter(
    (data) => data.Pages === activeNav
  );

  return (
    <>
      <picture className="page-banner">
        <source media="(min-width: 768px)" srcset={filterData[0].bannerImage} />
        <DynamicImage
          src={filterData[0].bannerImage}
          className="w-100"
          alt="Sukhothai"
        />
      </picture>
      <Container fluid className="bg-purple py-3">
        <Row>
          <Col sm={12}>
            <h2 className={`${styles.title} text-center mb-5`}>
              Priority Cards
            </h2>
          </Col>
          {submit ? (
            <Col sm={12} lg={{ span: 6, offset: 3 }}>
              <Table className={styles.table}>
                <thead>
                  <tr>
                    {tableHead.slice(0, 4).map((th) => (
                      <th key={th}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selected.plan}</td>
                    <td>{selected.payOnly}</td>
                    <td>{selected.getValue}</td>
                    <td>{selected.save} %</td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <Button block onClick={() => setSubmit(false)}>
                        Re-Select Plan
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Form.Text className="text-right">
                <span className={styles.pink}>Note:</span>
                Please fill all the details below which are required for online
                Transaction.
              </Form.Text>

              <Form onSubmit={handleSubmit} className="mt-5">
                <Row>
                  <Col sm={12} lg={6} className="mb-5">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Name</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name="GuestName"
                        onChange={handleChange}
                        placeholder="Full Name"
                        className={styles.input}
                      />
                    </InputGroup>
                    {errors?.GuestName && (
                      <Form.Text className="text-danger">
                        {errors.GuestName}
                      </Form.Text>
                    )}
                  </Col>
                  <Col sm={12} lg={6} className="mb-5">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Email</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name="GuestEmail"
                        onChange={handleChange}
                        placeholder="Email"
                        className={styles.input}
                      />
                    </InputGroup>
                    {errors?.GuestEmail && (
                      <Form.Text className="text-danger">
                        {errors.GuestEmail}
                      </Form.Text>
                    )}
                  </Col>
                  <Col sm={12} lg={6} className="mb-3">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Phone</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name="GuestTelephone"
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={styles.input}
                      />
                    </InputGroup>
                    {errors?.GuestTelephone && (
                      <Form.Text className="text-danger">
                        {errors.GuestTelephone}
                      </Form.Text>
                    )}
                  </Col>
                  <Col sm={12} lg={6} className="mb-3">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>City</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name="GuestCity"
                        onChange={handleChange}
                        placeholder="City"
                        className={styles.input}
                      />
                    </InputGroup>
                    {errors?.GuestCity && (
                      <Form.Text className="text-danger">
                        {errors.GuestCity}
                      </Form.Text>
                    )}
                  </Col>
                  <Col sm={12} className="mb-3">
                    <Form.Check
                      name="tandc"
                      value={values.tandc}
                      onChange={handleCheck}
                      label={
                        <span>
                          I have read and agree to the
                          <Link href="/tandc">
                            Terms of Service & Condition
                          </Link>
                        </span>
                      }
                    />
                  </Col>
                  <Col sm={12} className="mb-5">
                    <Button block disabled={!values.tandc}>
                      Proceed to Card Payment
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          ) : (
            <Col sm={12} lg={{ span: 6, offset: 3 }}>
              <Form className={styles.form}>
                <Container fluid>
                  <Row>
                    <Col
                      sm={12}
                      lg={4}
                      className={`yellow text-center py-4 px-2 ${styles.sidebar}`}
                    >
                      <h1 className="font-weight-bold mt-3 mb-0">Save</h1>
                      with Priority Membership
                      <br />
                      Now Life Time Validity
                    </Col>

                    <Col sm={12} lg={8} className="">
                      <Container fluid>
                        <Row noGutters>
                          <Col sm={12}>
                            <Table className={styles.table}>
                              <thead>
                                <tr>
                                  {tableHead.map((head) => (
                                    <th key={head}>{head}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {tableData.map((data) => (
                                  <tr key={data.plan}>
                                    <td>{data.plan}</td>
                                    <td>{data.payOnly}</td>
                                    <td>{data.getValue}</td>
                                    <td>{data.save} %</td>
                                    <td>
                                      <Form.Check
                                        custom
                                        type="radio"
                                        name="plan"
                                        onChange={handleRadio}
                                        id={data.plan}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                          <Col className="mb-2">
                            <Button
                              block
                              className="bg-pink border-0"
                              onClick={() => setSubmit(true)}
                            >
                              Submit
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "http://login.sukhothai.in/route/priorityCard/getPrepaid"
  )
    .then((res) => res.json())
    .then((res) => res.result);

  const res2 = await fetch(
    "http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData"
  );
  const response = await res2.json();

  const structuredData = res.map((dat, index) => {
    return {
      plan: index + 1,
      payOnly: dat.F_AMT,
      getValue: dat.F_VAL,
      save: dat.F_PER,
      checkbox: false, // dummy member for rendering
    };
  });

  return {
    props: {
      activeNav: "PRIORITY CARDS",
      cards: structuredData,
      bannerData: response,
    },
  };
}

export default PriorityCards;
