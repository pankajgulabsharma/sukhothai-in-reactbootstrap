import { useState } from "react";
import { Accordion, Card, Button, Collapse } from "react-bootstrap";
import AccordionCard from "../accordian-card";

const AccordionPage = ({ locationData }) => {
  // states
  const [toggled, setToggled] = useState(false); // global toggle
  const [openStates, setOpenStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]); // individual

  // handlers
  const handleToggle = () => {
    // global toggle handler
    if (toggled) {
      setOpenStates(openStates.map((x) => false));
    }
    setToggled(!toggled);
  };

  const handleOpen = (index) => {
    // individual toggle handler
    const copy = [...openStates];
    copy[index] = !copy[index];
    setOpenStates(copy);
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-4">
        <Button onClick={handleToggle}>
          {toggled ? "Collapse All" : "Expand All"}
        </Button>
      </div>
      <Accordion className="accordion--style-1">
        {locationData.map((data, index) => {
          const open = toggled ? true : openStates[index] ? true : false;
          return (
            <Card key={index}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey="0"
                  onClick={() => handleOpen(index)}
                  className="w-100"
                  aria-expanded="false" /* Arvind Add true on active and default false */
                  aria-controls="example-collapse-text"
                >
                  {data._id.city}
                </Accordion.Toggle>
              </Card.Header>
              <Collapse in={open}>
                <Card.Body>
                  <AccordionCard accordionCardData={data} />
                </Card.Body>
              </Collapse>
            </Card>
          );
        })}
      </Accordion>
    </>
  );
};
export default AccordionPage;
