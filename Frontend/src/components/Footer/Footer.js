import React from "react";
import {
  Navbar,
  Container,
  Nav,
  
} from "react-bootstrap";
import CurrencyModal from "./CurrencyModal";
import CopyrightIcon from "@mui/icons-material/Copyright";
function Footer() {
 
  
  return (
    <>
      <div></div>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container fluid>
          {/* <Navbar.Brand href="#">
            <h2 style={{ color: "red" }}>&nbsp;&nbsp;&nbsp; Etsy</h2>
          </Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="container-fluid"
              style={{ maxHeight: "100px" }}
              navbarScroll
              //className="ml-auto"
            >
              <Nav.Link >
                <CurrencyModal  />
              </Nav.Link>
              <Navbar.Text className="border-left pl-2 ms-auto">
                <CopyrightIcon />{' '}2022 Etsy, inc.
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
// render(<Home />);
export default Footer;
