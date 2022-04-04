import React from "react";
import "./ProfilePage.css";

import EditIcon from "@mui/icons-material/Edit";

import { Box } from "@mui/material";
import { Button } from "react-bootstrap";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { backend } from "../../config/backend";

const ProfilePage = () => {
    const navigate = useNavigate();

  const { userReducer } = useSelector((state) => state);
  const userData = userReducer.userReducer;

  const handleEditIcon = () => {
    navigate('/edit-profile-page');
  };
  const handleYourShopButton = async () => {};
  const imageClickHandler = (event) => {};

  let FavouriteItemList = (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <img
          src="https://www.etsy.com/assets/svg/profile/empty_favorite_items_new_brand.svg"
          alt=""
          width="150"
          height="150"
        />
        <br />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <p>Nothing here... yet</p>
      </Box>
    </>
  );

  let profileImageData = (
    <img
      id="avatar_img"
      src="https://www.etsy.com/images/avatars/default_avatar_400x400.png"
      alt=""
      className="img-fluid rounded-circle"
    />
  );
  if(userData.PROFILE_IMAGE) {
    const imgURL = `${backend}/images/${userData.PROFILE_IMAGE}`;
    profileImageData = (
      <img
        id="profile-image"
        src={imgURL}
        alt=""
        className="img-fluid rounded-circle"
      />
    );
  }

  return (
    <>
      <br />
      <div className="content-container">
        <div>
          <div className="container">
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-start">
                <div className="image-cropper">
                  {profileImageData}
                </div>
                <h4 className="display-6">&nbsp;&nbsp;{userData.NAME}</h4>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <EditIcon fontSize="large" onClick={handleEditIcon}/>
              </div>
              <div className="d-flex justify-content-end">
                <div className="d-flex flex-column">
                  <div></div>
                  <br />
                  <Button variant="dark" onClick={handleYourShopButton}>Your Shop</Button>
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <h4>Favourite Items</h4>
            {FavouriteItemList}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
