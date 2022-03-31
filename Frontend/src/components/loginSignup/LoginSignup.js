import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import LoginForm from "./LoginForm";
// import signupForm from "./signupForm";

function LoginSignup() {

  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleShowLogin = () => {
    setShowLoginForm(true);
  }
  const handleHideLogin = () => {
    setShowLoginForm(false)
  }


  return (
    <>
    <div>
        <Button variant="outline-dark" size="sm" 
        onClick={handleShowLogin}
        >
          {" "}
          Sign in
        </Button>
      </div>
      <LoginForm
                  
                  show={showLoginForm}
                  onHide={handleHideLogin}
          />
    
       {/* <div>
        <Button variant="outline-dark" size="sm" onClick={handleShowLogin}>
          {" "}
          Sign in
        </Button>
      </div>

      <Modal show={showLogin} onHide={handleCloseLogin}>
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
        <Modal.Body> <LoginForm /> </Modal.Body>
      </Modal>

       <Modal show={showSignup} onHide={handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Create your account </h4>
            <h6>Registration is easy.</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <signupForm />
          
        </Modal.Body>
      </Modal> *
      <signupForm show={showSignup} onHide={handleCloseSignup} /> */}
    </> 
  );
}
// render(<Home />);
export default LoginSignup;
