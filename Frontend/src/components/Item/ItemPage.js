import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Button, ImageListItem, ImageListItemBar } from "@mui/material";
import { getItemData } from "../../service/itemService";
import { backend } from "../../config/backend";
import { addToCart } from "../../store/actions/userActions";
import { Form } from "react-bootstrap";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ITEM_BY_ID } from "../../GraphQL/Queries/ItemQueries";
import { GET_SHOP } from "../../GraphQL/Queries/ShopQueries";

const ItemPage = () => {
  const { state } = useLocation();
  console.log(state);
  const { loading, error, data } = useQuery(GET_ITEM_BY_ID, {
    variables: { _id: state },
  });
  const [findShop] = useLazyQuery(GET_SHOP);

  let navigate = useNavigate();

  const [itemDetails, setItemDetails] = useState({});
  const [itemCount, setItemCount] = useState(1);
  const [shopDetails, setShopDetails] = useState("");
  const [giftWrapFlag, setGiftWrapFlag] = useState(false);
  // const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { currencyReducer } = useSelector((state) => state);
  const currencyvalue = currencyReducer.currencyReducer.currency;

  useEffect(() => {
    // let isSubscribed = true;
    const fetchItemData = async (data) => {
      setItemDetails(data.findItem);
      console.log(data);
      let shopData = await findShop({
        variables: {
          _id: data.findItem.SHOP,
        },
      });
      console.log(shopData.data.findShop);
      setShopDetails(shopData.data.findShop)
      // getItemData(state).then((res) => {
      //   if (res.data.status === "ok") {
      //     // setTimeout(() => {
      //     setItemDetails(res.data.item[0]);
      //     setShopDetails(res.data.item[0].SHOP);
      //     // });
      //   }
      // });
    };
    fetchItemData(data);
    // if (isSubscribed) {
    //   fetchItemData().catch(console.error);
    // }
    // return () => {
    //   isSubscribed = false;
    // };
    // if (data) {
    //   setItemDetails(data.findItem);
    //   console.log(data);
    //   let shopData = await findShop(data.findItem.SHOP)
    //   console.log(shopData);
    // }
  }, [data, findShop]);

  let currencySymbol = null;
  if (currencyvalue === "USD") {
    currencySymbol = <MonetizationOnIcon />;
  } else if (currencyvalue === "Euro") {
    currencySymbol = <EuroIcon />;
  } else if (currencyvalue === "INR") {
    currencySymbol = <CurrencyRupeeIcon />;
  }

  // const handleMessageChange = (e) => {
  //   setMessage(e.target.value);
  // };

  const handleAddToCart = (event) => {
    if (itemCount > itemDetails.QUANTITY_AVAILABLE) {
      alert("Oops!!! We don't have that much item in stock. Try Again Later!");
    } else {
      alert("Added to Cart");

      let addToCartData = {
        item: itemDetails,
        quantity: itemCount,
        // hasGiftWrap: giftWrapFlag,
        // message: message,
      };
      console.log("add to cart", addToCartData);
      dispatch(addToCart(addToCartData));
    }
  };

  const handleItemCount = (event) => {
    setItemCount(event.target.value);
  };

  const handleShopButton = () => {
    navigate("/shop-page", {
      state: shopDetails._id,
    });
    // console.log(shopDetails._id); 
  };

  let AddToCartButton = (
    <>
      <label htmlFor="quantity">Quantity: </label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={itemCount}
        min="1"
        onChange={handleItemCount}
      />
      <br />
      <br />
      <Button
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": { backgroundColor: "black" },
        }}
        onClick={handleAddToCart}
      >
        {" "}
        Add to cart
      </Button>
    </>
  );

  if (itemDetails.QUANTITY_AVAILABLE === 0) {
    AddToCartButton = <h4>Item Out Of Stock</h4>;
  }
  return (
    <div className="App">
      <section className="content-container">
        <div className="container">
          <article className="card">
            <div className="card-body">
              <div className="row">
                <aside className="col-md-6">
                  <article className="gallery-wrap">
                    <div className="card img-big-wrap">
                      {" "}
                      <ImageListItem key={itemDetails._id}>
                        <img
                          src={
                            itemDetails.ITEM_IMAGE
                              ? `https://etsy-images-bucket.s3.amazonaws.com/${itemDetails.ITEM_IMAGE}`
                              : ""
                          }
                          name={itemDetails._id}
                          alt={itemDetails.ITEM_NAME}
                          loading="lazy"
                        />
                        <ImageListItemBar
                          sx={{ backgroundColor: "transparent" }}
                          position="top"
                        />
                      </ImageListItem>
                    </div>
                  </article>
                </aside>
                <main className="col-md-6">
                  <article>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex justify-content-start">
                        <div className="d-flex flex-column">
                          <div className="d-flex justify-content-between">
                            <h6>Category: {itemDetails.CATEGORY}</h6>{" "}
                          </div>

                          <h2 className="title">{itemDetails.ITEM_NAME}</h2>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <Button
                          sx={{ color: "black", textAlign: "center" }}
                          style={{ maxHeight: "45px" }}
                          variant="outlined"
                          onClick={handleShopButton}
                        >
                          <h6>Shop: {shopDetails.SHOP_NAME}</h6>
                        </Button>
                      </div>
                    </div>
                    <hr />

                    <div className="mb-3">
                      <h6>Short description</h6>
                      <p>
                        {itemDetails.DESCRIPTION || <>Description goes here</>}
                      </p>
                    </div>

                    <div className="mb-3">
                      <var className="price h4">
                        {currencySymbol} {"  "}
                        {itemDetails.PRICE}
                      </var>{" "}
                      <br />
                    </div>
                    {/* <div className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id="gift"
                        label="Gift Wrap"
                        checked={giftWrapFlag}
                        onChange={() => setGiftWrapFlag(!giftWrapFlag)}
                      />
                    </div>
                    {giftWrapFlag && (
                      <div className="mb-3">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              value={message}
                              onChange={handleMessageChange}
                            />
                          </Form.Group>
                        </Form>
                      </div>
                    )} */}

                    <div className="mb-4">
                      {AddToCartButton}
                      &nbsp;&nbsp;&nbsp; {itemDetails.QUANTITY_SOLD} sales
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ItemPage;
