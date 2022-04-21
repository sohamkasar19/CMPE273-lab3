import React from "react";
import { Form,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { changeCurrency } from "../../store/actions/userActions";

const CurrencyForm = (props) => {

  const { currencyReducer } = useSelector((state) => state);
  const currencyReduxData = currencyReducer.currencyReducer;
  console.log(currencyReduxData.currency);
  const dispatch = useDispatch();

  const options = [
    { value: "USD", label: "USD" },
    { value: "Euro", label: "Euro" },
    { value: "INR", label: "INR" },
  ];
  const [formValue, setformValue] = React.useState(currencyReduxData.currency);

  
  const handleChange = (event) => {
    setformValue(event.value);
  };
 

  const handleSave = () => {
    dispatch(changeCurrency(formValue))
    props.onHide();
  };
  

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Currency</Form.Label>
        <Select
          name="name"
          placeholder={formValue}
          
          // searchable={false}
          value={formValue}
          options={options}
          onChange={handleChange}
        />
      </Form.Group>
      <div style={{ float: "right" }}>
        <Button variant="dark" type="submit" size="sm" onClick={handleSave}>
          {" "}
          Save
        </Button>
      </div>
    </Form>
  );
};
export default CurrencyForm;
