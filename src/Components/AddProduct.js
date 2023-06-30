import React, { useState } from "react";
import axios from "axios";
const AddProduct = () => {
  const [Data, setData] = useState({
    product_name: "",
    product_price: "",
    product_rating: "",
    product_disp: "",
  });
  const changeHandler = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const token = localStorage.getItem("auth");
  const config={headers:{
    auth:token,
  }} 
  const submitHandler = async (e) => {
    if (
      !Data.product_name ||
      !Data.product_price ||
      !Data.product_rating ||
      !Data.product_disp
    ) {
      alert("please enter data in all fields");
      return;
    } else {
      try {
        console.log(Data);
        const response = await axios.post(
          "http://192.168.0.199:5000/add",
          Data,config
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const { product_name, product_price, product_rating, product_disp } = Data;
  return (
    <div className="sign-page">
      <span className="field">Product_Name:</span>
      <br />
      <input
        type="text"
        className="input"
        placeholder="Enter product name"
        value={product_name}
        name="product_name"
        onChange={changeHandler}
      />
      <br />
      <span className="field">Product_Price:</span> <br />
      <input
        type="number"
        className="input"
        placeholder="Enter product price"
        value={product_price}
        name="product_price"
        onChange={changeHandler}
      />
      <br />
      <span className="field">Product_Rating:</span> <br />
      <input
        type="number"
        className="input"
        placeholder="Enter product rating"
        value={product_rating}
        name="product_rating"
        onChange={changeHandler}
      />
      <br />
      <span className="field">Product_Disp:</span> <br />
      <input
        type="text"
        className="input"
        placeholder="Enter product disp"
        value={product_disp}
        name="product_disp"
        onChange={changeHandler}
      />
      <br />
      <br />
      <button className="submit" onClick={submitHandler}>
        submit
      </button>    
    </div>
  );
};
export default  AddProduct;