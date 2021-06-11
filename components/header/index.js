import { Navbar, Nav, Container } from "react-bootstrap";
import Image from "next/image";

import styles from "./index.module.scss";

function Header({ data }) {
  return (
    <Navbar
      // className={styles.navbar_background}
      expand="lg"
      variant=""
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="/images/logo.png"
            alt="Sukhothai"
            className="img-fluid"
            width="180"
            height="50"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {data?.data.map(navData => {
              return (
                <Nav.Item key={navData._id}>
                  <Nav.Link
                    className={` ${
                      data.activeNav === navData.title
                        ? styles.active_header
                        : ""
                    } ${
                      navData.title === "APPOINTMENT"
                        ? styles.appointment_button
                        : ""
                    }`}
                    href={
                      navData.title === "BUY GIFT CARDS"
                        ? "/gift-cards"
                        : `/${navData.title.toLowerCase().replace(/ /g, "-")}`
                    }
                  >
                    {navData.title}
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
