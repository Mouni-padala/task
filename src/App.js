import React, { useState } from "react";
import ChangePassword from "./Components/ChangePassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Navbar from "./Components/Navbar";
import Image from "./Components/Image";
import Gdata from "./Components/Gdata";
import SearchFilter from "./Components/SearchFilter";
import Search from "./Components/Search";
import AddProduct from "./Components/AddProduct";
import Product from './Components/Product'
const App = () => {
  const updategdata = (data) => {
    setGdata({ ...gdata, ...data });
  };
  const [gdata, setGdata] = useState({
    islogin: false,
    islogout: false,
    updategdata: updategdata,
  });
  return (
    <div>
      {/* <SearchFilter/> */}
      <Gdata.Provider value={gdata}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Image" element={<Image />} />
            <Route path="/searchfilter" element={<SearchFilter />} />
            <Route path="/search" element={<Search />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/product" element={<Product/>}/>
          </Routes>
        </BrowserRouter>
      </Gdata.Provider>
    </div>
  );
};
export default App;
