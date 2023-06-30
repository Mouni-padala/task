import React from 'react';
import '../Css/App.css';
import {useNavigate} from 'react-router-dom';
const Product=()=>{
    const navigate=useNavigate();
    const addproduct=()=>{
        navigate('/addproduct')
    }
    const searchproduct=()=>{
        navigate('/search')
    }
    return(
        <div className="navbar">
            <button onClick={addproduct}>Add_Product</button>
            <button onClick={searchproduct}>search_Product</button>
        </div>
    )
}
export default Product;