import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import CurrencyForm from "./CurrencyForm";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
function CurrencyModal( ) {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  

  
  return (
    <>
      <div>
        <Button variant="outline-light" size="sm" onClick={handleShowLogin}>
          Change Currency <CurrencyRupeeIcon/><MonetizationOnIcon/><EuroIcon/>
        </Button>
      </div>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Update you settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CurrencyForm onHide={handleCloseLogin} />
        </Modal.Body>
      </Modal>
    </>
  );
}
// render(<Home />);
export default CurrencyModal;
