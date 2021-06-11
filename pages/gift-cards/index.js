import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Table, Container, Row, Col, Form, Button, InputGroup, Toast, Image }
from 'react-bootstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import useForm from './useForm.js';
import GiftInfo from '../../components/gift-info';
import validate from './validateInfo';

import styles from "./index.module.scss";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

function timeToMinutes(timeString) {
    const hours = parseInt(timeString.slice(0, 3));
    const minutes = parseInt(timeString.slice(3));
    return hours * 60 + minutes;
}

function HiddenForm({values, to}){
    return (
        <>
          {
              flattenedValues(values).map((x, i) => <input name={x.name} type="text" value={x.value} key={i} /> )
          }
          {
              flattenedTo(to).map((x, i) =>
                                  <React.Fragment key={i}>
                                    <input name="delivery_cust_name" type="text" value={x.name} />
                                    <input name="delivery_cust_email" type="text" value={x.email} />
                                    <input name="delivery_cust_tel" type="text" value={x.phone} />
                                  </React.Fragment>
                                 )
          }
        </>
    );
}

function GiftCards({ therapies }) {

    const formRef = useRef();
    
    const { values, validateValues,
            order,
            to, setTo, 
            errors, setErrors,
            submit, setSubmit,
            success, setSuccess,
            emptyMembers,
            handleSelection, handleGiftRecipients, handleBlur, handletandc, handleDetails, 
            handleSubmit, handleDealCode, handleSelf, handleGiftAttributes, handleXhr, handleCancel,
            isDirty,
            flattenedValues, flattenedTo,
            getChecksum
          } = useForm(therapies, validate, formRef);

    const [dirty, setDirty] = useState(true);
    const [flatVals, setFlatVals] = useState(flattenedValues(values));
    const [flatTos, setFlatTos] = useState(flattenedTo(to));

    // validate on change
    useEffect(() => {
        validateValues();

        // check if form invalid on every change
        setDirty(isDirty());
    }, [values, to, dirty]);
    
    // refresh no of to people accepting gifts
    useEffect(() => {
        // make empty fields
        let recipients = {};
        [...Array(values.count).keys()]
            .map(c => "recipient" + c)
            .forEach(re => {
                recipients[re] = { name: "", email: "", phone: "" };
            });
        setTo({ ...recipients });
        
        // reset recipient fields on count change
        [...Array(values.count).keys()]
            .map(c => ["name", "email", "phone"].map(x => {
                const elem = document.getElementById(x + c);
                if (elem) {
                    elem.value = "";
                }
            }));
    }, [values.count]);

    // for hidden form values update
    useEffect(() => {
        setFlatVals(flattenedValues(values));
        setFlatTos(flattenedTo(to));
    }, [to, values, order]);

    const tableHead = ["Code", "Therapy Type", "Therapist", "Minutes", "Inr", "Qty"];

    const tableData = [
        ...therapies
    ];

    const options = {
        giftTypes: [
            {
                id: 0,
                name: "Select",
            },
            {
                id: 1,
                name: "A Gift for you"
            },
            {
                id: 2,
                name: "Happy Anniversary"
            },
            {
                id: 3,
                name: "Happy Birthday"
            },
            {
                id: 4,
                name: "Happy couple"
            },
            {
                id: 5,
                name: "Love you"
            },
            {
                id: 6,
                name: "Miss you"
            },
            {
                id: 7,
                name: "Seasons Greetings"
            },
            {
                id: 8,
                name: "Thank You"
            },
        ],
        noOfGifts: [
            {
                name: "Select",
                value: 0
            },
            {
                name: "1",
                value: 1
            },
            {
                name: "2",
                value: 2
            },
            {
                name: "3",
                value: 3
            },
            {
                name: "4",
                value: 4
            },
            {
                name: "5",
                value: 5
            },
            {
                name: "6",
                value: 6
            },
            {
                name: "7",
                value: 7
            },
            {
                name: "8",
                value: 8
            },
            {
                name: "9",
                value: 9
            },
            {
                name: "10",
                value: 10
            }
        ]
    };

    // element variables

    return (
        <>
          <picture className="page-banner">
            <source
              media="(min-width: 768px)"
              srcSet="/images/page-banner/gift-card.jpg"
            />
            <DynamicImage
              src="/images/page-banner/gift-card.jpg"
              className="w-100"
              alt="Sukhothai"
            />
          </picture>
    {/* 2  */}
           <main className="main-content">
            <Container>
              <div className="section-block">
                <div className="block-heading-box">
                  <h2 className="block-title block-title--with-border text-center">Buy Gift Cards</h2>
                  <h3 className="text-center">People visit us again &amp; again &amp; again™</h3>
                  <h3 className="text-center">Our most popular unique Gift Cards for some one you love.</h3>
                </div>
                <Row className="justify-content-center">
                  <Col lg={10} xs={12}>
                    <p>We Guarantee a memorable experience for your loved ones for this gift card.</p>
                    <p>A gift valued by everyone, no matter their taste and preferences. We offer corporate gift vouchers for companies, organizations and individuals. Spa Therapy Gifts are the best solutions as a business gift, incentives or rewards.</p>
                    <p>Simply you have to select a Spa Therapy from our wide option for gifting and make them Feel Happy. After selection you can see the other transaction details on the right side to proceed.</p>
                  </Col>
                </Row>
              </div>
            </Container>
          </main>
    {/* 3 */}
          <Container fluid className="bg-purple">
            <Row>
              <Col className={styles.header} sm={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                {
                    submit ?
                      <>
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
                            {
                              therapies.filter(th => values.selected.includes(th.code))
                              .map(th =>
                                <tr>
                                  <td className="text-center">{th.code}</td>
                                  <td>{th.therapyType}</td>
                                  <td className="text-center">{th.price}</td>
                                </tr>
                              )
                            }
                            <tr className="font-weight-bold">
                              <td colSpan="2" className="text-right">Total Payable in Indian Rupees</td>
                              <td className="text-center">{values.total}</td>
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
                                  Gift Type: {options.giftTypes[values.type].name}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <Form.Control disabled value={values.from.name} className={`${styles.input}`} />
                                </td>
                                <td>
                                  <Form.Control disabled value={values.from.email} className={`${styles.input}`} />
                                </td>
                                <td>
                                  <Form.Control disabled value={values.from.phone} className={`${styles.input}`} />
                                </td>
                              </tr>
                            <tr>
                              <td colSpan="3">
                                Information of the person receiving the Gift Card
                              </td>
                            </tr>
                            {
                              [...Array(values.count).keys()]
                              .map(c => "recipient" + c)
                              .map(key => to[key])
                              .map(json =>
                                <tr>
                                  <td>
                                    <Form.Control disabled value={json.name} className={`${styles.input}`} />
                                  </td>
                                  <td>
                                    <Form.Control disabled value={json.email} className={`${styles.input}`} />
                                  </td>
                                  <td>
                                    <Form.Control disabled value={json.phone} className={`${styles.input}`} />
                                  </td>
                                </tr>
                              )
                            }
                            <tr>
                              <td>
                                <Button size="md" block onClick={handleSubmit}>
                                  Confirm
                                </Button>
                              </td>
                              <td colSpan="2">
                                <Button size="md" variant="light" onClick={() => {
                                    if (confirm("Are you sure you want to cancel processing")) {
                                        setSubmit(false);
                                    } else {
                                        console.log("not cancelling");
                                    }
                                }}>
                                  Cancel
                                </Button>
                              </td>
                            </tr>
                            {
                              [...Array(values.count).keys()]
                              .map(c => "recipient" + c)
                              .map(key => to[key])
                              .map(json =>
                                <tr>
                                  <td>
                                    <Form.Control disabled value={json.name} className={`${styles.input}`} />
                                  </td>
                                  <td>
                                    <Form.Control disabled value={json.email} className={`${styles.input}`} />
                                  </td>
                                  <td>
                                    <Form.Control disabled value={json.phone} className={`${styles.input}`} />
                                  </td>
                                </tr>
                              )
                            }
                            <tr>
                              <td>
                                <Button size="md" block onClick={handleSubmit}>
                                  Confirm
                                </Button>
                              </td>
                              <td colSpan="2">
                                <Button size="md" variant="light" onClick={() => setSubmit(false)}>
                                  Cancel
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                      :
                      <Form onSubmit={handleSubmit}>
                        <p className="text-right">
                          <Form.Text>*Special Online Discounted Price</Form.Text>
                        </p>
                        <div className="table-responsive-md">
                          <Table className="table-bordered gift-card-table">
                            <thead>
                              <tr>
                                {tableHead.map(th => <th key={th}>{th}</th>)}
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
                                  Gift Type: {options.giftTypes[values.type].name}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <Form.Control disabled value={values.from.name} className={`${styles.input}`} />
                                </td>
                                <td>
                                  <Form.Control disabled value={values.from.email} className={`${styles.input}`} />
                                </td>
                                <td>
                                  <Form.Control disabled value={values.from.phone} className={`${styles.input}`} />
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="3">
                                  Information of the person receiving the Gift Card
                                </td>
                              </tr>
                              {
                                  [...Array(values.count).keys()]
                                      .map(c => "recipient" + c)
                                      .map(key => to[key])
                                      .map(json =>
                                           <tr>
                                             <td>
                                               <Form.Control disabled value={json.name} className={`${styles.input}`} />
                                             </td>
                                             <td>
                                               <Form.Control disabled value={json.email} className={`${styles.input}`} />
                                             </td>
                                             <td>
                                               <Form.Control disabled value={json.phone} className={`${styles.input}`} />
                                             </td>
                                           </tr>
                                          )
                              }

                              <tr>
                                <td>
                                  <Button size="md" block onClick={e => handleSubmit(e)}>
                                    Confirm
                                  </Button>
                                </td>
                                <td colSpan="2">
                                  <Button size="md" variant="light" onClick={() => {
                                      if (confirm("Are you sure you want to cancel processing")) {
                                          let recipients = {};
                                          [...Array(values.count).keys()]
                                              .map(c => "recipient" + c)
                                              .forEach(re => {
                                                  recipients[re] = { name: "", email: "", phone: "" };
                                              });
                                          handleCancel();
                                          setTo({ ...recipients });
                                          setSubmit(false);
                                      } else {
                                          console.log("not cancelling");
                                      }
                                  }}>
                                    Cancel
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </Table>


                          {/* hidden form */}
                          <form method="post" action="https://www.ccavenue.com/shopzone/cc_details.jsp"
                                target="_parent" ref={formRef}>
                            {
                                flatVals.map((field, i) =>
                                             <input name={field.name} type="hidden" key={i} defaultValue={field.value} /> )
                            }

                            {
                                flatTos.map((person, i) => (
                                    <React.Fragment key={i}>
                                      <input name="delivery_cust_name" type="hidden" value={person.name} />
                                      <input name="delivery_cust_email" type="hidden" value={person.email} />
                                      <input name="delivery_cust_tel" type="hidden" value={person.phone} />
                                    </React.Fragment>
                                ))
                            }
                            <input name="Checksum" type="hidden"
                                   value={getChecksum("M_fin19494_19494", values.total, "3242",
                                                      "https:www.google.com",
                                                      "diux9vj27foywypwtmhwe9dbja251xvl")} readOnly={true}/>
                          </form>
                        </>
                    :
                    <Form onSubmit={handleSubmit}>
                      {/* THERAPIES TABLE */}

                      {/* // mobile view table */}
                      {
                          tableData.map(td =>
                                        <GiftInfo key={td.code} {...td} handleSelection={handleSelection} />
                                       )
                      }
                      {/* // desktop view table */}
                      <Form.Text className="my-3 text-right">*Special Online Discounted Price</Form.Text>
                      
                      <Table className={`${styles.table} d-none d-md-table`}>
                        <thead>
                          <tr>
                            {tableHead.map(th => <th key={th} className={th == "THERAPY TYPE" ? null : "text-center"}>{th}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map(td => <tr key={td.code} className={values.selected.includes(td.code) ? styles.pink : styles.yellow}>
                                                 <td className="text-center">{td.code}</td>
                                                 <td>{td.therapyType}</td>
                                                 <td className="text-center">{td.therapist}</td>
                                                 <td className="text-center">{td.minutes}</td>
                                                 <td className="text-center">{td.price}</td>
                                                 <td className="text-center">
                                                   <Form.Check type="checkbox"
                                                               name={td.code} id={td.code} onChange={handleSelection} />
                                                 </td>
                                               </tr>)}
                        </tbody>
                      </Table>
                      {
                          values.selected.length > 0 ?
                            <>
                              <Table className="table-bordered gift-deal-code-table">
                                <tbody>
                                  <tr>
                                    <th>Total Payable in Indian Rupees</th>
                                    <td>₹ <strong>{values.total}</strong></td>
                                  </tr>
                                  <tr>
                                    <th>Please enter Deal/Corporate Code to avail your Special Pricing</th>
                                    <td>
                                      <div className="form-group form-group--fl">
                                        <InputGroup>
                                          <InputGroup.Prepend>
                                            <InputGroup.Text>
                                              <i class="st-icon-coupon"></i>
                                            </InputGroup.Text>
                                          </InputGroup.Prepend>
                                          <div className="has-float-label">
                                            <Form.Control name="deal" type="text"
                                              className={`${styles.formControl} bg-purple`}
                                              placeholder="Deal Code"
                                              onChange={handleDealCode}
                                              onBlur={handleBlur}
                                            />
                                            <label for="Deal Code" class="control-label">Deal Code</label>
                                          </div>
                                        </InputGroup>
                                      </div>
                                      <Button>Recalculate</Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                              <div className="gift-card-form">
                                <p class="text-right ng-star-inserted">
                                  <small>*Please fill all the details below which are required for online Transaction.</small>
                                </p>
                                <Container>
                                   <Row>
                                  <Col sm={6} xs={12}>
                                    <h4 class="gift-card-form__title">Details of the person gifting the Card</h4>
                                    <div className="form-group form-group--fl">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i class="st-icon-user"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <div className="has-float-label">
                                          <Form.Control 
                                            type="text" 
                                            placeholder="Name"
                                            name="name" 
                                            onChange={handleDetails}
                                            onBlur={handleBlur}
                                            value={values.from.name}
                                          />
                                          <label for="Deal Code" class="control-label">Name</label>
                                        </div>
                                      </InputGroup>
                                      {
                                        errors && errors.from.name &&
                                        <Form.Text className="form-error">{errors.from.name}</Form.Text>
                                      }
                                    </div>
                                  

                                    <div className="form-group form-group--fl">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i class="st-icon-envelop"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <div className="has-float-label">
                                          <Form.Control 
                                            type="email" 
                                            placeholder="Email"
                                            name="email" 
                                            onChange={handleDetails}
                                            value={values.from.email}
                                            onBlur={handleBlur}
                                          />
                                          <label for="Deal Code" class="control-label">Email</label>
                                        </div>
                                      </InputGroup>
                                      {
                                        errors && errors.from.email &&
                                        <Form.Text className="form-error">{errors.from.email}</Form.Text>
                                      }
                                    </div>

                                    <div className="form-group form-group--fl">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i class="st-icon-call"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <div className="has-float-label">
                                          <Form.Control 
                                            type="number" 
                                            placeholder="Phone Number"
                                            name="phone" 
                                            onChange={handleDetails}
                                            onBlur={handleBlur}
                                            value={values.from.phone}
                                          />
                                          <label for="Deal Code" class="control-label">Mobile</label>
                                        </div>
                                      </InputGroup>
                                      {
                                        errors && errors.from.phone &&
                                        <Form.Text className="form-error">{errors.from.phone}</Form.Text>
                                      }
                                    </div>
                                  </Col>
                                  <Col sm={6} xs={12}>
                                    <h4 className="gift-card-form__title">Information of person receiving the Card</h4>
                                    <Form.Group className="form-group--fl form-group--gift-myself" controlId="giftmyself">
                                      <Form.Check 
                                        type="checkbox" 
                                        name="self" 
                                        onChange={handleSelf}
                                        checked={values.self}
                                        onBlur={handleBlur}
                                        label="Gifting Myself" />
                                    </Form.Group>
                                    
                                    <Form.Group className="form-group--fl">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i class="st-icon-gift"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <div className="has-float-label">
                                          <Form.Control 
                                            as="select" 
                                            type="number"
                                            value={values.type}
                                            name="type"
                                            placeholder="Phone Number"
                                            onChange={handleGiftAttributes}
                                            onBlur={handleBlur}
                                          >
                                            {options.giftTypes.map(gift => <option key={gift.id} value={gift.id}>{gift.name}</option>)}
                                          </Form.Control>
                                          <label class="control-label">Select Your Gift Type</label>
                                        </div>
                                      </InputGroup>
                                      {
                                        errors && errors.type &&
                                        <Form.Text className="text-danger mb-4">
                                          {errors.type}
                                        </Form.Text>
                                      }
                                    </Form.Group>

                                    <Form.Group className="form-group--fl">
                                      <InputGroup>
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i class="st-icon-gift-tag"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <div className="has-float-label">
                                          <Form.Control 
                                            as="select" 
                                            onChange={handleGiftAttributes}
                                            name="count"
                                            value={values.count}
                                            onBlur={handleBlur}
                                          >
                                            {options.noOfGifts.map(no => <option key={no.value} value={no.value}>{no.name}</option>)}
                                          </Form.Control>
                                          <label class="control-label">Number of Gifts</label>
                                        </div>
                                      </InputGroup>
                                      {
                                        errors && errors.count &&
                                        <Form.Text className="text-danger mb-4">
                                          {errors.count}
                                        </Form.Text>
                                      }
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <div className="number-gift-box-wrap">
                                  {[...Array(values.count).keys()]
                                    .map(count =>
                                      <>
                                      <div className="number-gift-box">
                                        <Row>
                                          <Col md={4} xs={12} key={count}>
                                            <Form.Group className="form-group--fl mb-md-0">
                                              <InputGroup>
                                                <InputGroup.Prepend>
                                                  <InputGroup.Text>
                                                    <i class="st-icon-user"></i>
                                                  </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <div className="has-float-label">
                                                  <Form.Control 
                                                    type="text"
                                                    placeholder="Name"
                                                    name={"name" + count}
                                                    onChange={handleGiftRecipients}
                                                    onBlur={handleBlur}
                                                  />
                                                  <label class="control-label">Name</label>
                                                </div>
                                              </InputGroup>
                                              {
                                                errors && errors.to && errors.to["recipient" + count] && errors.to["recipient" + count].name &&
                                                <Form.Text className="form-error">
                                                  {errors.to["recipient" + count].name}
                                                </Form.Text>
                                              }
                                            </Form.Group>
                                          </Col>
                                          <Col md={4} xs={12}>
                                            <Form.Group className="form-group--fl mb-md-0">
                                              <InputGroup>
                                                <InputGroup.Prepend>
                                                  <InputGroup.Text>
                                                    <i class="st-icon-envelop"></i>
                                                  </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <div className="has-float-label">
                                                  <Form.Control 
                                                    type="email"
                                                    placeholder="Email"
                                                    name={"email" + count}
                                                    onChange={handleGiftRecipients}
                                                    onBlur={handleBlur}
                                                  />
                                                  <label class="control-label">Email</label>
                                                </div>
                                              </InputGroup>
                                              {
                                                errors && errors.to && errors.to["recipient" + count] && errors.to["recipient" + count].email &&
                                                <Form.Text className="form-error">
                                                  {errors.to["recipient" + count].email}
                                                </Form.Text>
                                              }
                                            </Form.Group>
                                          </Col>
                                          <Col md={4} xs={12}>
                                            <Form.Group className="form-group--fl mb-0">
                                              <InputGroup>
                                                <InputGroup.Prepend>
                                                  <InputGroup.Text>
                                                    <i class="st-icon-call"></i>
                                                  </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <div className="has-float-label">
                                                  <Form.Control 
                                                    type="number" 
                                                    placeholder="Phone No"
                                                    name={"phone" + count}
                                                    onChange={handleGiftRecipients}
                                                    onBlur={handleBlur}
                                                  />
                                                  <label class="control-label">Phone Number</label>
                                                </div>
                                              </InputGroup>
                                              {
                                                errors && errors.to && errors.to["recipient" + count] && errors.to["recipient" + count].phone &&
                                                  <Form.Text className="form-error">
                                                    {errors.to["recipient" + count].phone}
                                                  </Form.Text>
                                              }
                                            </Form.Group>
                                          </Col>
                                        </Row>
                                      </div>
                                      </>
                                    )}
                                  </div>
                                  <Form.Group className="mb-5">
                                    <Form.Check 
                                      name="tandc" 
                                      onChange={handletandc}
                                      label={<span>I have read and agree to the <Link href="/tandc"> Terms of Service & Conditions
                                      </Link>.</span>}
                                    />
                                  </Form.Group>
                                  <div className="d-flex justify-content-center mb-5">
                                    <Button size="lg" className="mb-4" disabled={!values.tandc} onClick={() => setSubmit(true)}>
                                      Proceed for Card Payment
                                    </Button>
                                  </div>
                                </div>
                            </>
                          :
                          null
                        }
                      </Form>
                    }
                <p>When this gift card is presented at any of the SukhoThai spa it will carry the value you purchase now or it will be valued for Therapy selected. In case any less value is used by the gift card holder, then remaining value is carried forward on this card.</p>
                <p>
                  <Form.Text>
                    <span className={`${styles.pink}`}>Please Note: </span>
                    Spa Treatment will be provided subject to the Realisation of payment. Bank usually take 3 days from date of
                    transaction to credit the amout to our account.
                  </Form.Text>
                </Col>
                
              </Col>
            </Row>
          </Container>
    </>
    );
}

export async function getStaticProps() {

    // request
    const therapies = await fetch("http://login.sukhothai.in/route/giftcard/getTherapyList")
          .then(res => res.json())
          .then(res => {
              return res.data;
          });

    // structuring
    const cleanTherapies = therapies.map(
        th => {
            return {
                code: th.F22_TCODE,
                therapyType: th.F22_TNAME,
                therapist: th.F22_TNOS,
                minutes: timeToMinutes(th.F22_HHMM),
                price: th.PB_IPAD,
                checkbox: false // member for rendering only, no actual use
            };
        }
    );

    return {
        props: {
            activeNav: "BUY GIFT CARDS",
            therapies: cleanTherapies
        },
    };
}

export default GiftCards;
