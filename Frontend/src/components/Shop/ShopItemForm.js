import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { backend } from "../../config/backend";
import { itemAddNew, itemUploadImage } from "../../service/itemService";
import { ADD_ITEM } from "../../GraphQL/Mutations/ItemMutations";
import { IMAGE_UPLOAD } from "../../GraphQL/Mutations/ImageMutation";
import { useMutation } from "@apollo/client";

function ShopItemForm(props) {
  // console.log(props);

  const [addItem, { error }] = useMutation(ADD_ITEM);

  const [uploadImage] = useMutation(IMAGE_UPLOAD);

  const [itemForm, setItemForm] = useState({
    // ShopId: "",
    ItemName: "",
    Category: "",
    QuantityAvailable: "",
    Price: "",
    Description: "",
    ItemImage: "",
  });
  const handleChange = async (event) => {
    if (event.target.name === "ItemImage" && event.target.files[0]) {
      var itemPhoto = event.target.files[0];
      uploadImage({
        variables: {
          file: itemPhoto,
        },
      }).then((res) => {
        console.log(res);
        setItemForm({
          ...itemForm,
          ItemImage: res.data.uploadImage.file,
        });
      });
      // var data = new FormData();
      // data.append("image", itemPhoto);
      // itemUploadImage(data).then((res) => {
      //   const { data } = res;
      //   setItemForm({
      //     ...itemForm,
      //     ItemImage: data.image.PROFILE_IMAGE,
      //     ShopId: props.data.toString(),
      //   });
      // });
    } else {
      setItemForm({
        ...itemForm,
        [event.target.name]: event.target.value,
        ShopId: props.data.toString(),
      });
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    // console.log(itemForm);
    // itemAddNew(itemForm);
    // props.onHide();

    addItem({
      variables: {
        ITEM_NAME: itemForm.ItemName,
        SHOP: itemForm.ShopId,
        CATEGORY: itemForm.Category,
        ITEM_IMAGE: itemForm.ItemImage,
        PRICE: parseFloat(itemForm.Price),
        QUANTITY_AVAILABLE: parseInt(itemForm.QuantityAvailable),
        DESCRIPTION: itemForm.Description,
      },
    });

    window.location.reload(false);
  };

  // let imgURL = `${backend}/images/${itemForm.ItemImage}`;

  return (
    <div>
      <Modal
        {...props}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Item Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleItemSubmit}>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Item Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  name="ItemName"
                  type="text"
                  placeholder="Item Name"
                  onChange={handleChange}
                  value={itemForm.ItemName}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Category
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  name="Category"
                  type="text"
                  placeholder="Category"
                  onChange={handleChange}
                  value={itemForm.Category}
                  required
                  list="categoryList"
                />
                <datalist id="categoryList">
                  <option value="Clothing" />
                  <option value="Jewellery" />
                  <option value="Entertainment" />
                  <option value="Home Decor" />
                  <option value="Art" />
                </datalist>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Quantity
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  name="QuantityAvailable"
                  type="number"
                  min={"0"}
                  placeholder="Quantity"
                  value={itemForm.QuantityAvailable}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Price
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  name="Price"
                  type="number"
                  step={"0.01"}
                  min={"0"}
                  placeholder="Price"
                  value={itemForm.Price}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Description
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  name="Description"
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  onChange={handleChange}
                  value={itemForm.Description}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Form.Label column sm={4}>
                Image
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  name="ItemImage"
                  type="file"
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>
            <br />
            <Button variant="dark" type="submit" onSubmit={handleItemSubmit}>
              Submit
            </Button>
            &nbsp;
            <Button variant="dark" onClick={props.onHide}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ShopItemForm;
