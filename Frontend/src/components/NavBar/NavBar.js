import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import LoginSignup from "../loginSignup/LoginSignup";

function NavBar() {
  let LoginSignupButton = (
    <Nav.Link className="border-left pl-2 ms-auto" href="">
      <LoginSignup />
    </Nav.Link>
  );

  return (
    <>
      <div></div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <h2
              style={{ color: "red" }}
              // onClick={(e) => navigate("/home")}
            >
              &nbsp;&nbsp;&nbsp; Etsy
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="container-fluid"
              style={{ maxHeight: "100px" }}
              navbarScroll
              //className="ml-auto"
            >
              <Form className="d-flex ms-auto">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="form-control-lg me-2"
                  aria-label="Search"
                  // value={searchEntry}
                  // onChange={handleSearchChange}
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  // onClick={handleSearchClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  {/* Search */}
                </Button>
              </Form>

              {LoginSignupButton}
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
// render(<Home />);
export default NavBar;
