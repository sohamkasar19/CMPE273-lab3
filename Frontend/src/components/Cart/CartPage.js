import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { backend } from "../../config/backend";
import {
  addQuantity,
  removeItem,
  subtractQuantity,
  addGiftWrap,
  addMessage
} from "../../store/actions/userActions";
import { checkout } from "../../service/orderService";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userReducer, cartReducer, currencyReducer } = useSelector(
    (state) => state
  );
  const cartReduxData = cartReducer.cartReducer;
  const userReduxData = userReducer.userReducer;
  const currencyvalue = currencyReducer.currencyReducer.currency;

  const [giftWrapFlag, setGiftWrapFlag] = useState(new Map());
  const [message, setMessage] = useState(new Map());

  let currencySymbol = null;
  if (currencyvalue === "USD") {
    currencySymbol = <MonetizationOnIcon />;
  } else if (currencyvalue === "Euro") {
    currencySymbol = <EuroIcon />;
  } else if (currencyvalue === "INR") {
    currencySymbol = <CurrencyRupeeIcon />;
  }

  // console.log(cartDetails);
  const handleCheckout = (e) => {
    var checkoutData = {
      userId: userReduxData._id,
      cartData: cartReduxData,
    };
    dispatch(checkout(checkoutData));
    setTimeout(() => {
      navigate('/order-history')
    }, 300);
  };

 

  let cartItems = cartReduxData.addedItems.map((item) => {
    return (
      <tr>
        <td>
          <div className="d-flex flex-column">
            <div className="p-2">{item.ITEM_NAME}</div>
            <div className="p-2">
              <img
                style={{ height: 250 }}
                src={`${backend}/images/${item.ITEM_IMAGE}`}
                alt={item.ITEM_NAME}
                className=""
              />
            </div>
          </div>
        </td>
        <td className="text-center">
          <div className="d-flex justify-content-center">
            <div className="p-2">
              <AddCircleIcon onClick={() => dispatch(addQuantity(item._id))} />
            </div>
            <div className="p-2">{item.quantityInCart}</div>
            <div className="p-2">
              <RemoveCircleIcon
                onClick={() => dispatch(subtractQuantity(item._id))}
              />
            </div>
          </div>
        </td>
        <td className="text-center">{item.PRICE}</td>
        <td className="text-center" >
          <Form.Check
            type="checkbox"
            id="gift"
            // label="Gift Wrap"
            checked={giftWrapFlag.get(item._id)}
            onChange={() => {
              let payloadFlag = {
                itemId: item._id,
                flag: !giftWrapFlag.get(item._id)
              }
              giftWrapFlag.set(item._id, !giftWrapFlag.get(item._id))
              setGiftWrapFlag(giftWrapFlag)
              console.log(giftWrapFlag);
              
              dispatch(addGiftWrap(payloadFlag))
            }}
          />
          <div>
            {giftWrapFlag.get(item._id) && (
              <div className="mb-3">
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                    // className="w-200"
                      as="textarea"
                      rows={2}
                      value={message.get(item._id)}
                      onChange={(e) => {
                        message.set(item._id, e.target.value)
                        setMessage(message)
                        let payloadMessage = {
                          itemId: item._id,
                          message: e.target.value
                        }
                        dispatch(addMessage(payloadMessage))
                      }}
                    />
                  </Form.Group>
                </Form>
              </div>
            )}
          </div>
        </td>
        <td className="text-center">{item.quantityInCart * item.PRICE}</td>
        <td className="text-center">
          <DeleteIcon onClick={() => dispatch(removeItem(item._id))} />
        </td>
      </tr>
    );
  });

  let cartDetails = (
    <>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <td class="text-center">Item</td>
              <td class="text-center">Quantity</td>
              <td class="text-center">Price</td>
              <td class="text-center">Gift Wrap</td>
              <td class="text-center">Total</td>
              <td class="text-center"></td>
            </tr>
          </thead>
          <tbody>{cartItems}</tbody>
        </table>
      </div>
    </>
  );
  if (cartReduxData.addedItems.length === 0) {
    return (
      <div>
        <Container>
          <br />
          <br />
          <Row>
            <Col md={{ span: 3, offset: 3 }}>
              <h3>Nothing in cart</h3>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={9}>
              <div id="content" className="d-flex justify-content-center">
                <div className="cart">
                  <ul className="cartWrap">{cartDetails}</ul>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="d-flex justify-content-center">
                <Col>
                  <Row>
                    <Col>
                      <br />
                      <h4> Total</h4>
                    </Col>
                    <Col>
                      <br />
                      {currencySymbol}
                      {/* {cartReduxData.total} */}
                      {cartReduxData.total.toFixed(2)}
                    </Col>
                  </Row>

                  <Row>
                    <Col md={{ span: 6, offset: 5 }}>
                      <br />
                      <Button
                        variant="dark"
                        onClick={handleCheckout}
                        className="btn continue"
                      >
                        Checkout
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default CartPage;
