import React, { useState,useContext } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import Gdata from "./Gdata";
const UpdateProduct = () => {
    const gdata = useContext(Gdata);
    console.log(process.env.REACT_APP_UPDATE_PRODUCT_API);
 const navigate=useNavigate();
 console.log(gdata.updateProductData)
 console.log(gdata.updateProductData._id)
  const [Data, setData] = useState({
    product_name: gdata.updateProductData.product_name,
    product_price: gdata.updateProductData.product_price,
    product_rating:gdata.updateProductData.product_rating,
    product_disp: gdata.updateProductData.product_disp,
  });
  const changeHandler = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const token = localStorage.getItem("auth");
  const config = {
    headers: {
      auth: token,
    },
  };
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
        if(gdata.isadmin){
        const response = await axios.put(
    `${process.env.REACT_APP_UPDATE_PRODUCT_API}/${gdata.updateProductData._id}`,
          Data,
          config
        );
        console.log(response.data);
        alert("Updated successfully!")
        navigate('/search')}
        
      } catch (error) {
        console.error(error);
      }
    }
  };
  const { product_name, product_price, product_rating, product_disp } = Data;
  return (

    <div className="AddProduct-page">
      <span className="Add-field">Product_Name:</span>
      <br />
      <input
        type="text"
        className="Add-input"
        placeholder="Enter product name"
        value={product_name}
        name="product_name"
        onChange={changeHandler}
      />
      <br />
      <span className="Add-field">Product_Price:</span> <br />
      <input
        type="number"
        className="Add-input"
        placeholder="Enter product price"
        value={product_price}
        name="product_price"
        onChange={changeHandler}
      />
      <br />
      <span className="Add-field">Product_Rating:</span> <br />
      <input
        type="number"
        className="Add-input"
        placeholder="Enter product rating"
        value={product_rating}
        name="product_rating"
        onChange={changeHandler}
      />
      <br />
      <span className="Add-field">Product_Disp:</span> <br />
      <input
        type="text"
        className="Add-input"
        placeholder="Enter product disp"
        value={product_disp}
        name="product_disp"
        onChange={changeHandler}
      />
      <br /><br/>
      <button className="Add-submit" onClick={submitHandler}>
        update
      </button>
    </div>
  );
};
export default UpdateProduct;
