import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function SignupForm(props) {
  const [signupFormValue, setSignupFormValue] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleSignupFormChange = (e) => {
    setSignupFormValue({
      ...signupFormValue,
      [e.target.name]: e.target.value,
    });
  }
  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
    console.log(signupFormValue);
  }

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
        <Form onSubmit={handleSignupFormSubmit}>
      <Form.Group className="mb-3" >
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
      <Form.Group className="mb-3" >
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
      <Form.Group className="mb-3" >
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
        <Button variant="dark" type="submit" >
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
