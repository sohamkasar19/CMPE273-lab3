import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userLogout } from "../../store/actions/userActions";
import LoginSignup from "../loginSignup/LoginSignup";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userReducer } = useSelector((state) => state);
  const userReduxData = userReducer.userReducer;

  const signedInFlag = Object.keys(userReduxData).length === 0;

  const [searchEntry, setSearchEntry] = useState("");

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchEntry(event.target.value);
  };

  const handleLogoutClick = () => {
    dispatch(userLogout());
    navigate("/home");
  };

  const handleShopIconClick = () => {
    navigate("/name-your-shop");
  };

  const handleSearchClick = () => {
    if (searchEntry.length > 0) {
      setSearchEntry("")
      navigate("/search", {
        state: searchEntry,
      });
    }
  };

  let LoginSignupButton = (
    <Nav.Link className="border-left pl-2 ms-auto" href="">
      <LoginSignup />
    </Nav.Link>
  );

  let CartButton = (
    <Nav.Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        fill="currentColor"
        className="bi bi-cart4"
        viewBox="0 0 16 16"
        onClick={(e) => navigate("/cart")}
      >
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
      </svg>
    </Nav.Link>
  );

  let Favourite = (
    <div>
      <Nav.Link
        className="border-left pl-2 ms-auto"
        onClick={() => navigate("/profile-page")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="26"
          fill="currentColor"
          className="bi bi-heart"
          viewBox="0 0 16 14"
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      </Nav.Link>
    </div>
  );
  let ShopButton = (
    <div>
      <Nav.Link className="border-left pl-2 ms-auto">
        <StoreIcon
          fontSize="medium"
          sx={{ width: "20", height: "26", color: "black" }}
          onClick={handleShopIconClick}
        />
        &nbsp;&nbsp;
      </Nav.Link>
    </div>
  );
  let LogoutButton = (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-box-arrow-left"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
        />
        <path
          fillRule="evenodd"
          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
        />
      </svg>
      <button className="btn bg-transparant" onClick={handleLogoutClick}>
        Sign out
      </button>
    </div>
  );
  let LoginLogOutDropDown = (
    <Dropdown className="border-left pl-2 ms-auto">
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={(e) => {
            navigate("/profile-page");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          &nbsp;&nbsp;&nbsp;View Profile
        </Dropdown.Item>
        <Dropdown.Item>{LogoutButton}</Dropdown.Item>
        <Dropdown.Item onClick={(e) => navigate("/order-history")}>
          <ShoppingBagIcon /> &nbsp;Purchases
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <div></div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <h2 style={{ color: "red" }} onClick={(e) => navigate("/home")}>
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
                  value={searchEntry}
                  onChange={handleSearchChange}
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleSearchClick}
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

              {signedInFlag && LoginSignupButton}
              {!signedInFlag && LoginLogOutDropDown}
              {!signedInFlag && ShopButton}
              {!signedInFlag && Favourite}
              &nbsp;&nbsp;&nbsp;
              {!signedInFlag && CartButton}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
// render(<Home />);
export default NavBar;
