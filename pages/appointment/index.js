import { useState, useEffect } from "react";
import {
  InputGroup,
  Form,
  Container,
  Row,
  Col,
  Button,
  FormGroup
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import dynamic from "next/dynamic";
import validate from "./validateInfo.js";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./index.module.scss";

const DynamicImage = dynamic(
  () => import("../../components/custom-image"),
  <div>...loading</div>
);

function Appointment({ appointmentBanner, activeNav }) {
  const filterData = appointmentBanner?.data.filter(
    data => data.Pages === activeNav
  );

  const [locations, setLocations] = useState([]);

  const options = {
    noOfPersons: [
      {
        name: "Select Number of people",
        value: 0
      },
      {
        name: 1,
        value: 1
      },
      {
        name: 2,
        value: 2
      },
      {
        name: 3,
        value: 3
      },
      {
        name: 4,
        value: 4
      },
      {
        name: 5,
        value: 5
      }
    ],
    time: [
      {
        name: "Select",
        value: ""
      },
      {
        name: "11:00 AM",
        value: "11:00 AM"
      },
      {
        name: "11:30 AM",
        value: "11:30 AM"
      },
      {
        name: "12:00 PM",
        value: "12:00 PM"
      },
      {
        name: "12:30 PM",
        value: "12:30 PM"
      },
      {
        name: "01:00 PM",
        value: "01:00 PM"
      },
      {
        name: "01:30 PM",
        value: "01:30 PM"
      },
      {
        name: "02:00 PM",
        value: "02:00 PM"
      },
      {
        name: "02:30 PM",
        value: "02:30 PM"
      },
      {
        name: "03:00 PM",
        value: "03:00 PM"
      },
      {
        name: "03:30 PM",
        value: "03:30 PM"
      },
      {
        name: "04:00 PM",
        value: "04:00 PM"
      },
      {
        name: "04:30 PM",
        value: "04:30 PM"
      },
      {
        name: "05:00 PM",
        value: "05:00 PM"
      },
      {
        name: "05:30 PM",
        value: "05:30 PM"
      },
      {
        name: "06:00 PM",
        value: "06:00 PM"
      },
      {
        name: "06:30 PM",
        value: "06:30 PM"
      },
      {
        name: "07:00 PM",
        value: "07:00 PM"
      },
      {
        name: "07:30 PM",
        value: "07:30 PM"
      },
      {
        name: "08:00 PM",
        value: "08:00 PM"
      },
      {
        name: "08:30 PM",
        value: "08:30 PM"
      },
      {
        name: "09:00 PM",
        value: "09:00 PM"
      },
      {
        name: "09:30 PM",
        value: "09:30 PM"
      }
    ]
  };

  // fetch all spa locations
  useEffect(() => {
    fetch("http://login.sukhothai.in/route/spaLocationST/getLocationListNew")
      .then(res => res.json())
      .then(res => {
        let locations = [];
        res.map(loc => {
          let location = {
            name: loc["ST_LOCN"],
            value: loc["ST_BRN"]
          };
          locations.push(location);
        });
        setLocations([
          ...locations,
          { name: "Select", value: "" } /* null option */
        ]);
      });
  }, []);

  // form state
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    spalocation: "",
    totalPerson: "",
    datetimepicker1: new Date(),
    spavisit: "",
    comment: ""
  });

  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    setErrors(validate(values));

    if (
      Object.keys(errors).length === 0 &&
      errors.constructor === Object /* check if errors is empty */
    ) {
      fetch("http://login.sukhothai.in/route/appointmentST", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.success) {
            alert("Success");
          } else {
            alert("Fail");
          }
        });
    } else {
      alert("errors");
    }
  }

  function handleChange(e) {
    const { name, value } = event.target;
    setErrors(validate(values));
    setValues({ ...values, [name]: value });
  }

  function handleBlur(e) {
    setErrors(validate(values));
  }

  function setDate(date) {
    setErrors(validate(values));
    setValues({ ...values, appointmentDate: date });
  }

  return (
    <>
      <picture className="page-banner">
        <source media="(min-width: 768px)" srcSet={filterData[0].bannerImage} />
        <DynamicImage
          src={filterData[0].bannerImage}
          className="w-100"
          alt="Sukhothai"
        />
      </picture>
      <main className="main-content">
        <Container>
          <div className="section-block">
            <div className="block-heading-box">
              <h2 className="block-title block-title--with-border text-center">
                {filterData[0].pageHeader}
              </h2>
            </div>
            <Row className="justify-content-center">
              <Col lg={6} md={8} xs={12}>
                <Form className={`${styles.form}`} onSubmit={handleSubmit}>
                  <FormGroup className="form-group--fl">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="st-icon-user"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <div className="has-float-label">
                        <Form.Control
                          type="text"
                          placeholder="Full Name"
                          name="fullName"
                          onBlur={handleBlur}
                          defaultValue={values.fullName}
                          onChange={handleChange}
                        />
                        <label htmlFor="fullName" className="control-label">
                          Full Name
                        </label>
                      </div>
                    </InputGroup>
                    {errors && errors.fullName && (
                      <Form.Text className="text-danger">
                        {errors.fullName}
                      </Form.Text>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group--fl">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="st-icon-envelop"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <div className="has-float-label">
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          onBlur={handleBlur}
                          defaultValue={values.email}
                          onChange={handleChange}
                        />
                        <label htmlFor="email" className="control-label">
                          Email
                        </label>
                      </div>
                    </InputGroup>
                    {errors && errors.email && (
                      <Form.Text className="text-danger">
                        {errors.email}
                      </Form.Text>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group--fl">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="st-icon-call"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <div className="has-float-label">
                        <Form.Control
                          type="number"
                          placeholder="Phone Number"
                          name="phone"
                          onBlur={handleBlur}
                          defaultValue={values.phone}
                          onChange={handleChange}
                        />
                        <label htmlFor="phone" className="control-label">
                          Phone
                        </label>
                      </div>
                    </InputGroup>
                    {errors && errors.phone && (
                      <Form.Text className="text-danger">
                        {errors.phone}
                      </Form.Text>
                    )}
                  </FormGroup>
                  <Row>
                    <Col md={6} xs={12}>
                      <FormGroup className="form-group--fl">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>
                              <i className="st-icon-location-pin"></i>
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <div className="has-float-label">
                            <Form.Control
                              name="spalocation"
                              as="select"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="custom-select"
                            >
                              {locations.map(loc => (
                                <option value={loc.value} key={loc.value}>
                                  {loc.name}
                                </option>
                              ))}
                            </Form.Control>
                            <label
                              htmlFor="spalocation"
                              className="control-label"
                            >
                              Select Your Sukho Thai
                            </label>
                          </div>
                        </InputGroup>
                        {errors && errors.spalocation && (
                          <Form.Text className="text-danger">
                            {errors.spalocation}
                          </Form.Text>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6} xs={12}>
                      <FormGroup className="form-group--fl">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>
                              <i className="st-icon-user"></i>
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <div className="has-float-label">
                            <Form.Control
                              name="totalPerson"
                              as="select"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              className="custom-select"
                            >
                              {options.noOfPersons.map(no => (
                                <option value={no.value} key={no.value}>
                                  {no.name}
                                </option>
                              ))}
                            </Form.Control>
                            <label
                              htmlFor="spalocation"
                              className="control-label"
                            >
                              Select No. of Person
                            </label>
                          </div>
                        </InputGroup>
                        {errors && errors.totalPerson && (
                          <Form.Text className="text-danger">
                            {errors.totalPerson}
                          </Form.Text>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6} xs={12}>
                      <FormGroup className="form-group--fl">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>
                              <i className="st-icon-calendar"></i>
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <div className="has-float-label">
                            <DatePicker
                              selectedDate={values.datetimepicker1}
                              closeOnScroll={true}
                              onChange={date => setDate(date)}
                              isClearable
                              dateFormat="MM/dd/yyyy"
                              placeholderText="Select Date"
                              className="form-control"
                            />
                            <label
                              htmlFor="Select Appoinment Date"
                              className="control-label"
                            >
                              Select Appointment Date
                            </label>
                          </div>
                        </InputGroup>
                        {errors && errors.datetimepicker1 && (
                          <Form.Text className="text-danger">
                            {errors.datetimepicker1}
                          </Form.Text>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6} xs={12}>
                      <FormGroup className="form-group--fl">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>
                              <i className="st-icon-clock"></i>
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <div className="has-float-label">
                            <Form.Control
                              name="spavisit"
                              as="select"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              className="custom-select"
                            >
                              {options.time.map(time => (
                                <option value={time.value} key={time.value}>
                                  {time.name}
                                </option>
                              ))}
                            </Form.Control>
                            <label
                              htmlFor="Select Your Visiting Time"
                              className="control-label"
                            >
                              Select Your Visiting Time
                            </label>
                          </div>
                        </InputGroup>
                        {errors && errors.spavisit && (
                          <Form.Text className="text-danger">
                            {errors.spavisit}
                          </Form.Text>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup className="form-group--fl">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="st-icon-comment"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <div className="has-float-label">
                        <Form.Control
                          type="text"
                          as="textarea"
                          rows="3"
                          onBlur={handleBlur}
                          placeholder="Message"
                          defaultValue={values.message}
                          onChange={handleChange}
                          name="comment"
                        />
                        <label htmlFor="Message" className="control-label">
                          Message
                        </label>
                      </div>
                    </InputGroup>
                  </FormGroup>
                  <Row className="justify-content-center">
                    <Col md={4} sm={6} xs={12}>
                      <Button
                        className="btn btn-primary btn-block"
                        size="lg"
                        type="submit"
                      >
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData"
  );
  const response = await res.json();

  return {
    props: {
      appointmentBanner: response,
      activeNav: "APPOINTMENT"
    }
  };
}

export default Appointment;
