import React, { useEffect, useState } from "react";
import Heart from "react-animated-heart";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../../service/userService";


function Favourite(props) {
  const [isFavourite, setFavourite] = useState(false);

  const { userReducer } = useSelector((state) => state);
  const userReduxData = userReducer.userReducer;
  const favourites = userReduxData.FAVOURITES

  const dispatch = useDispatch()
  
  useEffect(() => {
    let isSubscribed = true;
    const fetchFavourites = async () => {
    //   const local = JSON.parse(localStorage.getItem("user"));
    //   const token = local.token;
    //   let responseData = await axios.get(
    //     API+"/item/favourites",
    //     {
    //       params: {
    //         token: token,
    //       },
    //     }
    //   );

      for (let id of favourites) {
        if (id === props.data._id) {
          setFavourite(true);
        }
      }
    };

    if (isSubscribed) {
      fetchFavourites().catch(console.error);
    }
    return () => {
      isSubscribed = false;
    };
  }, [favourites, props.data._id]);

  

  const handleClick = () => {
    if(userReduxData._id) {
      const itemData = {
        userId : userReduxData._id,
        itemId : props.data._id
      }
      if(isFavourite) {
          setFavourite(false);
          dispatch(removeFavourite(itemData))
      }
      else {
          setFavourite(true);
          dispatch(addFavourite(itemData))
      }
    }
    else {
      alert("Sign in to Add Favourites");
    }
    

  };

  return <>
  {<Heart isClick={isFavourite} onClick={handleClick} />}
  </>;
}

export default Favourite;
