import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { backend } from "../../config/backend";
import { GET_ORDERS } from "../../GraphQL/Queries/OrderQueries";
import { getOrderHistory } from "../../service/orderService";
// import { Button, Col, Container, Row, Table } from "react-bootstrap";
import OrderTable from "./OrderTable";

function OrderHistory() {
  const { userReducer } = useSelector((state) => state);
  const userReduxData = userReducer.userReducer;

  const [orderList, setOrderList] = useState([]);

  const { error, loading, data } = useQuery(GET_ORDERS, {
    variables: {
      userId: userReduxData._id,
    },
  });
  // const [getOrders] = useLazyQuery(GET_ORDERS);

  useEffect(() => {
    // let isSubscribed = true;

    // const fetchOrderHistory = () => {
    //   getOrderHistory(userReduxData._id).then((res) => {
    //     // setOrderList(res.data.ORDER_HISTORY);
    //     console.log("orders", res.data.ORDER_HISTORY);
    //     let orderListRes = res.data.ORDER_HISTORY.map((order) => {
    //       // console.log(order);
    //       let orderList_res = order.ORDER_ITEMS.map((orderItem) => {
    //         let newOrderItem = {
    //           _id: order._id.substring(14),
    //           ITEM_NAME: orderItem.ORDER_ITEM.ITEM_NAME,
    //           ITEM_IMAGE: `${backend}/images/${orderItem.ORDER_ITEM.ITEM_IMAGE}`,
    //           ORDER_DATE: order.ORDER_DATE,
    //           BUY_PRICE: orderItem.BUY_PRICE,
    //           QUANTITY: orderItem.QUANTITY,
    //           GIFT_WRAP: orderItem.GIFT_WRAP,
    //           MESSAGE: orderItem.MESSAGE,
    //           TOTAL_PRICE: orderItem.BUY_PRICE * orderItem.QUANTITY,
    //         };
    //         return newOrderItem;
    //       });
    //       return orderList_res;
    //     });
    //     let orderListRes_flattened_sorted = orderListRes
    //       .flat()
    //       .sort((a, b) => (a.ORDER_DATE < b.ORDER_DATE) ? 1 : ((a.ORDER_DATE > b.ORDER_DATE) ? -1 : 0));
    //     console.log(orderListRes_flattened_sorted);
    //     setOrderList(orderListRes_flattened_sorted);
    //   });
    // };
    // if (isSubscribed) {
    //   fetchOrderHistory();
    // }
    // return () => {
    //   isSubscribed = false;
    // };
    if (data) {
      console.log(data);
      let orderListRes = data.getOrders.map((order) => {
        // console.log(order);
        let orderList_res = order.ORDER_ITEMS.map((orderItem) => {
          let newOrderItem = {
            _id: order._id.substring(14),
            ITEM_NAME: orderItem.ORDER_ITEM.ITEM_NAME,
            ITEM_IMAGE: `https://etsy-images-bucket.s3.amazonaws.com/${orderItem.ORDER_ITEM.ITEM_IMAGE}`,
            ORDER_DATE: order.ORDER_DATE,
            BUY_PRICE: orderItem.BUY_PRICE,
            QUANTITY: orderItem.QUANTITY,
            GIFT_WRAP: orderItem.GIFT_WRAP,
            MESSAGE: orderItem.MESSAGE,
            TOTAL_PRICE: orderItem.BUY_PRICE * orderItem.QUANTITY,
          };
          return newOrderItem;
        });
        return orderList_res;
      });
      let orderListRes_flattened_sorted = orderListRes
        .flat()
        .sort((a, b) =>
          a.ORDER_DATE < b.ORDER_DATE ? 1 : a.ORDER_DATE > b.ORDER_DATE ? -1 : 0
        );
      console.log(orderListRes_flattened_sorted);
      setOrderList(orderListRes_flattened_sorted);
    }
  }, [data]);

  // We'll start our table without any data
  if (orderList.length === 0) {
    return (
      <div>
        <Container>
          <br />
          <br />
          <Row>
            <Col md={{ span: 3, offset: 3 }}>
              <h3>No Orders yet</h3>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else
    return (
      //  <Styles>
      <OrderTable data={orderList} />
      // </Styles>
    );
}

export default OrderHistory;
