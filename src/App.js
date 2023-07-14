import React, { useState } from "react";
import ChangePassword from "./Components/ChangePassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Navbar from "./Components/Navbar";
import FileUpload from "./Components/FileUpload";
import Gdata from "./Components/Gdata";
import Search from "./Components/Search";
import AddProduct from "./Components/AddProduct";
import FileVersioning from "./Components/FileVersioning";
import FileViewer from "./Components/FileViewer";
import ImgToText from "./Components/ImgToText";
import AdminAndCustomer from "./Components/AdminAndCustomer";
import User from "./Components/User";
import MultipleFileUpload from './Components/MutlipleFileUpload';
import ChartGraph from './Components/ChartGraph';
import UpdateProduct from './Components/UpdateProduct';
const App = () => {
  const updategdata = (data) => {
    setGdata({ ...gdata, ...data });
  };
  const [gdata, setGdata] = useState({
    islogin: false,
    islogout: false,
    isadmin: false,
    iscustomer: false,
    isuser: false,
    isgraph:false,
    updateProductData:{},
    updategdata: updategdata,
  });
  return (
    <div>
      <Gdata.Provider value={gdata}>
        <BrowserRouter>
          {!gdata.islogin && <Navbar />}
          {gdata.isuser && <User />}
          {(gdata.isadmin || gdata.iscustomer) && <AdminAndCustomer />}
          <Routes>
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            {gdata.islogin&&<Route path="/fileupload" element={<FileUpload />} />}
           {gdata.islogin&& <Route path="/search" element={<Search />} />}
           {gdata.islogin&&<Route path="/addproduct" element={<AddProduct />} />}
           {gdata.islogin&&<Route path="/fileversioning" element={<FileVersioning />} />}
           {gdata.islogin&&<Route path="/fileviewer" element={<FileViewer />} />}
           {gdata.islogin&&<Route path="/imgtotext" element={<ImgToText />} />}
           {gdata.islogin&&<Route path="/multiplefileupload" element={<MultipleFileUpload/>}/>}
           {gdata.islogin&&<Route path="/chart" element={<ChartGraph/>}/>}
           {gdata.islogin&&<Route path="/updateproduct" element={<UpdateProduct/>}/>}
          </Routes>
        </BrowserRouter>
      </Gdata.Provider>
    </div>
  );
};
export default App;
