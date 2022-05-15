import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userSignup } from "../../service/userService";
import { USER_SIGNUP } from "../../GraphQL/Queries/UserQueries";
import { useLazyQuery } from "@apollo/client";
import { userInfo } from "../../store/actions/userActions";

function SignupForm(props) {
  const [signupFormValue, setSignupFormValue] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const [userSignup, error] = useLazyQuery(USER_SIGNUP);

  const dispatch = useDispatch();

  const handleSignupFormChange = (e) => {
    setSignupFormValue({
      ...signupFormValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();
    // dispatch(userSignup(signupFormValue)).then((res) => {
    //   if (res) {
    //     props.onHide();
    //   } else {
    //     setShowAlert(true);
    //   }
    // });
    let userData = await userSignup({
      variables: {
        name: signupFormValue.name,
        email: signupFormValue.email,
        password: signupFormValue.password
      }
    }).then((res) =>{
      console.log(res);
      // if(error) {
      //   setShowAlert(true);
      // }
      // else 
      if(res.data.userSignup) {
        
        dispatch(userInfo(res.data.userSignup))
        props.onHide();
      }
      else {
        setShowAlert(true);
      }
    }
    )
    console.log(userData.data.userSignup);
    if(userData.data.userLogin ) {
      // props.onHide()
      dispatch(userInfo(userData.data.userLogin))
      props.onHide()
    }
    else {
      setShowAlert(true)
    }
  };

  return (
    <div
      onKeyDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
    >
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Create your account </h4>
            <h6>Registration is easy.</h6>
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
          <Form onSubmit={handleSignupFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={signupFormValue.email}
                onChange={handleSignupFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={signupFormValue.name}
                onChange={handleSignupFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={signupFormValue.password}
                onChange={handleSignupFormChange}
                required
              />
            </Form.Group>
            <div className="d-grid gap-2 rounded-circle">
              <Button variant="dark" type="submit">
                Signup
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SignupForm;
