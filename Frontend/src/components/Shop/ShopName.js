import React, { useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useNavigate } from "react-router";
import { addNewShop, shopCheckName } from "../../service/shopService";
import { useDispatch, useSelector } from "react-redux";



function ShopName() {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState("");
  const [shopName, setShopName] = useState("");
  
  const { userReducer } = useSelector((state) => state);
  const userReduxData = userReducer.userReducer;

  const dispatch = useDispatch();
  

  let checkShopName = async () => {
    let { data } = await shopCheckName(shopName);
    if(data.shopFound === true) {
      setIsAvailable(false);
    }
    if(data.shopFound === false) {
      setIsAvailable(true);
    }
  };

  let addShopName = async () => {
    const data = {
      shopname: shopName,
      userId: userReduxData._id
    }
    dispatch(addNewShop(data)).then((res) => {
      const { SHOP } = res.payload;
      navigate("/shop-page", {
        state: SHOP,
      });
    })
  };

  const handleChangeShopName = (event) => {
    setShopName(event.target.value);
  };

  const handleClickContinue = () => {
    if (isAvailable === true) {
      addShopName();
    }
  };
  const handleClickCheckAvailable = () => {
    if (shopName.length !== 0) {
      checkShopName();
    }
  };

  return (
    <>
      
        
        <div className="d-flex justify-content-center">
          <br />
          <br />
          <div className="card text-center" style={{ width: "50rem" }}>
            <div className="card-header">
              <h2>Name Your Shop</h2>
            </div>
            <div className="card-body">
              <InputGroup className="col-md-4">
                <FormControl
                  placeholder="Enter Shop Name"
                  style={{ borderRadius: 35 }}
                  value={shopName}
                  onChange={handleChangeShopName}
                  required
                />
                {isAvailable === false && (
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      borderRadius: 35,
                      backgroundColor: "#cc0000",
                    }}
                    startIcon={<ClearIcon />}
                  >
                    Not Available
                  </Button>
                )}
                {isAvailable === true && (
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      borderRadius: 35,
                      backgroundColor: "#6aa84f",
                    }}
                    startIcon={<CheckIcon />}
                  >
                    Available
                  </Button>
                )}
                <Button
                  style={{
                    borderRadius: 35,
                    backgroundColor: "#000000",
                    color: "#ffffff",
                  }}
                  variant="contained"
                  onClick={handleClickCheckAvailable}
                >
                  Check Availability
                </Button>
              </InputGroup>
            </div>

            <div className="card-footer text-muted">
              <div className="d-flex justify-content-end">
                {isAvailable === true && (
                  <Button
                    style={{
                      borderRadius: 35,
                      backgroundColor: "#000000",
                      color: "#ffffff",
                    }}
                    variant="contained"
                    onClick={handleClickContinue}
                  >
                    Save and Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
}

export default ShopName;
