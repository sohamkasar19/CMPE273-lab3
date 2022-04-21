import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend } from "../../config/backend";
import { getOrderHistory } from "../../service/orderService";
// import { Button, Col, Container, Row, Table } from "react-bootstrap";
import OrderTable from "./OrderTable";

function OrderHistory() {
  const { userReducer } = useSelector((state) => state);
  const userReduxData = userReducer.userReducer;

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchOrderHistory = () => {
      getOrderHistory(userReduxData._id).then((res) => {
        // setOrderList(res.data.ORDER_HISTORY);
        console.log(res.data.ORDER_HISTORY);
        let orderListRes = res.data.ORDER_HISTORY.map( order => {
          let orderList_res = order.ORDER_ITEMS.map(orderItem => {
            let newOrderItem = {
              _id : order._id.substring(14),
              ITEM_NAME : orderItem.ORDER_ITEM.ITEM_NAME,
              ITEM_IMAGE : `${backend}/images/${orderItem.ORDER_ITEM.ITEM_IMAGE}`,
              ORDER_DATE : order.ORDER_DATE,
              BUY_PRICE : orderItem.BUY_PRICE,
              QUANTITY : orderItem.QUANTITY,
              TOTAL_PRICE : 0
            }
            return newOrderItem
          })
          return  orderList_res
        })
        let orderListRes_flattened_sorted = orderListRes.flat().sort((a, b) => (a.ORDER_DATE > b.ORDER_DATE) ? -1 : 1)
        console.log(orderListRes_flattened_sorted);
        setOrderList(orderListRes.flat());
      });
    };
    if (isSubscribed) {
      fetchOrderHistory();
    }
    return () => {
      isSubscribed = false;
    };
  }, [userReduxData._id]);

 
  

  // We'll start our table without any data


  
  return (
  //  <Styles>
      <OrderTable
        
        data={orderList}
        
      />
    // </Styles>
  )
}

export default OrderHistory;
