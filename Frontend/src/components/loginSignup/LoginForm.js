import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import SignupForm from "./SignupForm";
import { userLogin } from "../../service/userService";
import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { USER_LOGIN } from "../../GraphQL/Queries/UserQueries";
import { userInfo } from "../../store/actions/userActions";

function LoginForm(props) {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loginFormValue, setLoginFormValue] = useState({
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const [userLogin] = useLazyQuery(USER_LOGIN);

  const dispatch = useDispatch();

  const handleLoginFormChange = (e) => {
    setLoginFormValue({
      ...loginFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowSignup = () => {
    setShowSignupForm(true);
    props.onHide();
  };
  const handleHideSignup = () => {
    setShowSignupForm(false);
  };
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    let userData = await userLogin({
      variables: {
        email: loginFormValue.email,
        password: loginFormValue.password
      }
    })
    console.log(userData);
    if(userData.data.userLogin && userData.data.userLogin.NAME != null) {
      // props.onHide()
      dispatch(userInfo(userData.data.userLogin))
      props.onHide()
    }
    else {
      setShowAlert(true)
    }
  };
  return (
    <>
      <SignupForm show={showSignupForm} onHide={handleHideSignup} />
      <div
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
      >
        <Modal {...props}>
          <Modal.Header closeButton>
            <Modal.Title>
              Login &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                className="float-right"
                variant="outline-dark"
                size="sm"
                onClick={handleShowSignup}
                style={{ marginLeft: "auto" }}
              >
                {" "}
                Register
              </Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert
              show={showAlert}
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              <Alert.Heading>Oh snap! Something's wrong!</Alert.Heading>
              <p>Check your credentials</p>
            </Alert>
            <Form onSubmit={handleLoginFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={loginFormValue.email}
                  onChange={handleLoginFormChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginFormValue.password}
                  onChange={handleLoginFormChange}
                  required
                />
              </Form.Group>
              <div className="d-grid gap-2 rounded-circle">
                <Button variant="dark" type="submit" size="md">
                  {" "}
                  Login
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default LoginForm;
