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
import {
  fetchShopData,
  shopUploadImage,
  updateShopData,
} from "../../service/shopService";
import { useSelector } from "react-redux";
import ShopItemForm from "./ShopItemForm";
import { backend } from "../../config/backend";
import ShopEditItemForm from "./ShopEditItemForm";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_SHOP } from "../../GraphQL/Queries/ShopQueries";
import { GET_ITEM_LIST } from "../../GraphQL/Queries/ItemQueries";
import { IMAGE_UPLOAD } from "../../GraphQL/Mutations/ImageMutation";
// import ShopItemFormEdit from "./ShopItemFormEdit";

function ShopPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [shopData, setShopData] = useState({});
  const [shopItems, setShopItems] = useState([]);
  const [isOwner, setIsOwner] = useState(true);
  const [ownerData, setOwnerData] = useState({});
  const [showItemForm, setShowItemForm] = useState(false);
  const [showEditItemForm, setShowEditItemForm] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const { userReducer } = useSelector((state) => state);
  const userReduxData = userReducer.userReducer;

  const {
    loading,
    error,
    data: shopDetails,
  } = useQuery(GET_SHOP, {
    variables: { _id: state },
  });

  const [uploadImage, { data: imageData }] = useMutation(IMAGE_UPLOAD);

  const [findItemList] = useLazyQuery(GET_ITEM_LIST);

  // const reduxState = useSelector((state) => state);
  // const [currencyvalue, setcurrencyValue] = useState(reduxState.currency);
  // let temp = "624e120e2371c45d82211290";
  useEffect(() => {
    // if(!state) {
    //   navigate('/');
    // }

    // let isSubscribed = true;

    // let totalSold = responseShopItems.data.reduce((prev, curr) => {
    //   return (prev += curr.QuantitySold);
    // }, 0);
    // console.log(totalSold);
    // setTotalSales(totalSold);
    // const fetchShopInfo = async (shopid) => {
    //   let response =  await fetchShopData(shopid);
    //   const { data } = response;
    //   await setShopData(data.shop);

    //   // console.log(data.shop);
    // }

    // if (isSubscribed) {

    //   // fetchShopInfo(temp).catch(console.error());
    //   fetchShopData(state).then(async (res) => {
    //     const { data } = res;
    //     setTimeout(() => {
    //       setShopData(data.shop);
    //     setShopItems(data.shop.SHOP_ITEMS);
    //      setOwnerData(data.shop.OWNER);
    //     });
    //     if(data.shop.OWNER._id === userReduxData._id) {
    //       setIsOwner(true);
    //     }
    //   });

    // }
    // return () => {
    //   isSubscribed = false;
    // };
    let isSubscribed = true;
    const fetchAllDetails = async (shopDetails) => {
      if (shopDetails) {
        setShopData(shopDetails.findShop);
        let { data: itemsData } = await findItemList({
          variables: { idList: shopDetails.findShop.SHOP_ITEMS },
        });
        setShopItems(itemsData.findItemList);
      }
    };
    if (isSubscribed) {
      fetchAllDetails(shopDetails);
    }
    return () => {
      isSubscribed = false;
    };
  }, [findItemList, shopDetails]);
  // function handleImageChange({
  //   target: {
  //     validity,
  //     files: [file],
  //   },
  // }) {
  //   if (validity.valid) uploadImage({  variables: { file: file[0] } });
  // }
  const handleImageChange = async (event) => {
    var shopPhoto = event.target.files[0];
    console.log(shopPhoto);
    uploadImage({
      variables: {
        file: shopPhoto,
      },
    });

    // var data = new FormData();
    // data.append("image", shopPhoto);
    // shopUploadImage(data)
    // .then((res) => {
    //   const { data } = res;
    //   setShopData({
    //     ...shopData,
    //     SHOP_IMAGE: data.image.PROFILE_IMAGE,
    //   })
    //   var data1 = {
    //     ShopImage: data.image.PROFILE_IMAGE,
    //     ShopId: shopData._id,
    //   }
    //   updateShopData(data1);
    // })
  };

  const handleEditIcon = (item) => {
    return function () {
      setSelectedItem(item);
      setShowEditItemForm(true);
    };
  };

  const imageClickHandler = (event) => {
    navigate("/item", {
      state: event.target.name,
    });
  };

  let ShopItemImages = (
    <>
      <ImageList cols={4}>
        {shopItems.map((item) => (
          <ImageListItem key={item._id}>
            <img
              src={`${backend}/images/${item.ITEM_IMAGE}`}
              name={item._id}
              alt={item.ITEM_NAME}
              loading="lazy"
              onClick={imageClickHandler}
            />
            <ImageListItemBar
              title={item.ITEM_NAME}
              subtitle={"Sales: " + item.QUANTITY_SOLD}
              actionIcon={
                isOwner && (
                  <EditIcon fontSize="medium" onClick={handleEditIcon(item)} />
                )
              }
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );

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
  if (shopData.OWNER) {
    //  let imgURL = `${backend}/images/${shopData.OWNER.PROFILE_IMAGE}`;
    OwnerImage = (
      <img
        style={{ width: 100, height: 100 }}
        id="profile-image"
        // src={imgURL}
        alt=""
        className="img-fluid rounded-circle"
      />
    );
  }

  let contactDetails = null;
  if (showContactDetails) {
    contactDetails = <p>Email : {shopData.OWNER.EMAIL}</p>;
  }
  let shopImage = (
    <img
      style={{ width: 150, height: 150 }}
      className="shop-icon-external wt-rounded wt-display-block snipcss-Q6mLH snip-img"
      // srcSet="https://www.etsy.com/images/avatars/default_shop_icon_500x500.png 500w,
      //                                                                          https://www.etsy.com/images/avatars/default_shop_icon_280x280.png 280w,
      //                                                                          https://www.etsy.com/images/avatars/default_shop_icon_180x180.png 180w,
      //                                                                       https://www.etsy.com/images/avatars/default_shop_icon_75x75.png 75w"
      src={
        shopData.SHOP_IMAGE
          ? `${backend}/images/${shopData.SHOP_IMAGE}`
          : "https://www.etsy.com/images/avatars/default_shop_icon_180x180.png"
      }
      sizes="(min-width: 900px) 18vw, 30vw"
      alt=""
    />
  );
  if (shopData.SHOP_IMAGE) {
  }

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
                  {ownerData.NAME}
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
                  data={state}
                  show={showItemForm}
                  onHide={() => setShowItemForm(false)}
                  key={selectedItem.ItemId}
                />
                <ShopEditItemForm
                  data={shopData._id}
                  show={showEditItemForm}
                  onHide={() => setShowEditItemForm(false)}
                  item={selectedItem}
                  key={selectedItem._id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <br />
        <br />
        {ShopItemImages}
      </div>
    </>
  );
}

export default ShopPage;
