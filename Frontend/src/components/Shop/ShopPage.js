import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
// import ShopItemForm from "./ShopItemForm";
// import ShopImage from "./ShopImage";
import EditIcon from "@mui/icons-material/Edit";
import { fetchShopData } from "../../service/shopService";
import { useSelector } from "react-redux";
import ShopItemForm from "./ShopItemForm";
// import ShopItemFormEdit from "./ShopItemFormEdit";

function ShopPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [shopData, setShopData] = useState({});

  const [isOwner, setIsOwner] = useState(false);
  const [ownerData, setOwnerData] = useState({});
  const [showItemForm, setShowItemForm] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const { userReducer } = useSelector((state) => state);
  const userReduxData = userReducer.userReducer;

  // const reduxState = useSelector((state) => state);
  // const [currencyvalue, setcurrencyValue] = useState(reduxState.currency);

  useEffect(() => {
    // if(!state) {
    //   navigate('/');
    // }

    let isSubscribed = true;

    // let totalSold = responseShopItems.data.reduce((prev, curr) => {
    //   return (prev += curr.QuantitySold);
    // }, 0);
    // console.log(totalSold);
    // setTotalSales(totalSold);

    if (isSubscribed) {
      // fetchAllShopData().catch(console.error());
      let temp = "624e120e2371c45d82211290";
      fetchShopData(temp).then((res) => {
        const { data } = res;
        setShopData(data.shop);
        if(data.shop.OWNER._id === userReduxData._id) {
          setIsOwner(true);
        }
      });
     
      
    }
    return () => {
      isSubscribed = false;
    };
  }, [state,userReduxData._id]);
  // console.log(userReduxData._id);
  // if(shopData.OWNER._id === userReduxData._id) {
  //   setIsOwner(true);
  // }
  const handleImageChange = async (event) => {};

  let handleEditIcon = (item) => {
    return function () {
      // setSelectedItem(item);
      // setShowItemFormEdit(true);
    };
  };
  const imageClickHandler = (event) => {
    //   navigate("/item", {
    //     state: event.target.name,
    //   });
  };

  // let ShopItemImages = (
  //   <>
  //     <ImageList cols={4}>
  //       {shopItems.map((item) => (
  //         <ImageListItem key={item.ItemId}>
  //           <img
  //             src={item.ItemImage}
  //             name={item.ItemId}
  //             alt={item.ItemName}
  //             loading="lazy"
  //             onClick={imageClickHandler}
  //           />
  //           <ImageListItemBar
  //             title={item.ItemName}
  //             subtitle={"Sales: " + item.QuantitySold}
  //             actionIcon={
  //               isOwner && (
  //                 <EditIcon fontSize="medium" onClick={handleEditIcon(item)} />
  //               )
  //             }
  //             position="below"
  //           />
  //         </ImageListItem>
  //       ))}
  //     </ImageList>
  //   </>
  // );

  let OwnerImage = (
    <img
      id="avatar_img"
      style={{ width: 100, height: 100 }}
      src="https://www.etsy.com/images/avatars/default_avatar_400x400.png"
      // src={formValue.ProfileImagePreview}
      alt=""
      className="img-fluid rounded-circle"
    />
  );
  // if (ownerData.ProfileImage) {
  //   OwnerImage = (
  //     <img
  //       style={{ width: 100, height: 100 }}
  //       id="profile-image"
  //       src={ownerData.ProfileImage}
  //       alt=""
  //       className="img-fluid rounded-circle"
  //     />
  //   );
  // }

  let contactDetails = null;
  if (showContactDetails) {
    contactDetails = <p>Email : {ownerData.Email}</p>;
  }
  let shopImage = (
    <img
      style={{ width: 150 }}
      className="shop-icon-external wt-rounded wt-display-block snipcss-Q6mLH snip-img"
      srcSet="https://www.etsy.com/images/avatars/default_shop_icon_500x500.png 500w,
                                                                               https://www.etsy.com/images/avatars/default_shop_icon_280x280.png 280w,
                                                                               https://www.etsy.com/images/avatars/default_shop_icon_180x180.png 180w,
                                                                            https://www.etsy.com/images/avatars/default_shop_icon_75x75.png 75w"
      src="https://www.etsy.com/images/avatars/default_shop_icon_180x180.png"
      sizes="(min-width: 900px) 18vw, 30vw"
      alt=""
    />
  );

  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start">
              {shopImage}
              <br />
              {/* <ShopImage data={shopData.ShopImage} /> */}
              <div className="d-flex flex-column ">
                <h1 className="display-4">&nbsp;{shopData.SHOP_NAME}</h1>
                <div className="d-flex justify-content-start">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {isOwner && (
                    <label htmlFor="upload-photo">
                      <input
                        style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={handleImageChange}
                      />
                      <Button
                        variant="contained"
                        component="span"
                        style={{ color: "white", backgroundColor: "black" }}
                      >
                        Edit Shop Image
                      </Button>{" "}
                    </label>
                  )}
                  {isOwner && (
                    <div>
                      <h4>Total Sales : {totalSales}</h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className="d-flex flex-column ">
                <div className="d-flex justify-content-center">SHOP OWNER</div>
                <div className="d-flex justify-content-center">
                  {OwnerImage}
                </div>

                {/* <br/> */}
                <div className="d-flex justify-content-center">
                  {ownerData.Name}
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="text"
                    style={{ size: "small", color: "black" }}
                    onClick={() => setShowContactDetails(true)}
                  >
                    Contact
                  </Button>
                </div>
                <div className="d-flex justify-content-center">
                  {contactDetails}
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        <div className="container">
          <div className="d-flex flex-column ">
            <div className="d-flex justify-content-between">
              <div>
                <h4>Shop Items</h4>
              </div>
              <div>
                {isOwner && (
                  <Button
                    style={{ color: "white", backgroundColor: "black" }}
                    onClick={() => setShowItemForm(true)}
                  >
                    Add Item
                  </Button>
                )}
                
                <ShopItemForm
                    data={shopData._id}
                    show={showItemForm}
                    onHide={() => setShowItemForm(false)}
                    item={selectedItem}
                    key={selectedItem.ItemId}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <br />
        <br />
        {/* {ShopItemImages} */}
      </div>
    </>
  );
}

export default ShopPage;
