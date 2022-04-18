import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "./cartPage.css";
import axios from "axios";
import { useNavigate } from "react-router";
// import { checkoutCart } from "../actions/cartActions";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { backend } from "../../config/backend";


const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
//   const cartDetails = useSelector((state) => state);

  const { userReducer, cartReducer } = useSelector((state) => state);
  const cartReduxData = cartReducer.cartReducer;
  const userReduxData = userReducer.userReducer;

//   const reduxState = useSelector((state) => state);
//   const [currencyvalue, setcurrencyValue] = useState(reduxState.currency);

//   useEffect(() => {
   
//     // setcurrencyValue(reduxState.currency);
//   }, [navigate]);

//   let currencySymbol = null;
//   if (currencyvalue === "USD") {
//     currencySymbol = <MonetizationOnIcon />;
//   } else if (currencyvalue === "Euro") {
//     currencySymbol = <EuroIcon />;
//   } else if (currencyvalue === "INR") {
//     currencySymbol = <CurrencyRupeeIcon />;
//   }

  // console.log(cartDetails);
  const handleCheckout = (e) => {
    // if (cartDetails.addedItems.length !== 0) {
    //   var data = {
    //     addedItems: cartDetails.addedItems,
    //     total: cartDetails.total,
    //     token: token,
    //   };

    //   axios
    //     .get(API+"/profile/check-address", {
    //       params: {
    //         token: token,
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       if (response.data) {
    //         axios
    //           .post(API+"/order/add", data)
    //           .then((response) => {
    //             if (response.status === 200) {
    //               dispatch(checkoutCart());
    //               navigate("/purchase");
    //               // console.log("Axios post done from Checkout");
    //             }
    //           });
    //       }else {
    //         alert("You don't have any delivery address... Edit in your profile");
    //       }
    //     });
    // } else {
    //   alert("Your cart is empty...");
    // }
  };
//   console.log(cartReduxData.addedItems);
//   let addItems =
//   cartReduxData.addedItems.length !== 0 ? (
//     cartReduxData.addedItems.map((item) => {
//         return (
//           <li className="items odd">
//             <div className="infoWrap">
//               <div className="cartSection">
//                 <p className="itemNumber">{item._id}</p>
//                 <h3>{item.ITEM_NAME}</h3>
//                 <img style={{  height: 250 }} src={`${backend}/images/${item.ITEM_IMAGE}`} alt={item.ITEM_NAME} className="" />
//                 <p>
//                   {" "}
//                   <input
//                     type="text"
//                     className="qty"
//                     placeholder={item.quantityInCart}
//                     readOnly
//                   />{" "}
//                   {/* x {currencySymbol} */}
//                    {item.PRICE}
//                 </p>
//               </div>

//               <div className="prodTotal cartSection">
//                 <p>
//                   {/* {currencySymbol} */}
//                   {item.quantityInCart * item.PRICE}
//                 </p>
//               </div>
//             </div>
//           </li>
//         );
//       })
//     ) : (
//       <h2>OOPS!...Nothing In Cart</h2>
//     );
let cartItems = cartReduxData.addedItems.map((item) => {
    return (
      <tr>
        <td>
        <div className="d-flex flex-column">
            <div className="p-2">{item.ITEM_NAME}</div>
            <div className="p-2"><img style={{  height: 250 }} src={`${backend}/images/${item.ITEM_IMAGE}`} alt={item.ITEM_NAME} className="" /></div>
            
        </div>
        </td>
        <td className="text-center">
        <div className="d-flex justify-content-center">
            <div className="p-2"><AddCircleIcon onClick={()=> console.log(item)}/></div>
            <div className="p-2">{item.quantityInCart}</div>
            <div className="p-2"><RemoveCircleIcon /></div>
        </div>
        </td>
        <td className="text-center">{item.PRICE}</td>
        <td className="text-center">{item.quantityInCart * item.PRICE}</td>
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
                  <td class="text-center">Gift Package</td>
                  <td class="text-center">Total</td>
                </tr>
              </thead>
              <tbody>{cartItems}</tbody>
            </table>
          </div>
        </>
      );

  return (
    
    <div>
      <Container>
          <Row>
          <Col  xs={12} md={8}>
          <div id="content" className="d-flex justify-content-center">
            
            <div className="cart">
              <ul className="cartWrap">{cartDetails}</ul>
            </div>

            </div>

          </Col>
          <Col  md={{ span: 2, offset: 1 }}>
          <div className="d-flex justify-content-center">
              <Col>
              <Row>
                  <Col>
                  <h4> Total</h4>
                  </Col>
                  <Col>
                  {/* {currencySymbol} */}
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
};

export default CartPage;
