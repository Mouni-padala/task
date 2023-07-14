import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Gdata from "./Gdata";
import '../Css/App.css';
const AdminAndCustomer = () => {
  const gdata = useContext(Gdata);
  return (
    <div className="navbar">
    <div className="nav">
      {gdata.islogin && (gdata.isadmin || gdata.iscustomer) && (
        <div>
          <Link className="link-tag" to="/addproduct">
            Add_Product
          </Link>
          <Link className="link-tag" to="/search">
            Search_product
          </Link>
        </div>
      )}
      {gdata.islogin && (
          <div>
            <Link className="link-tag" to="/fileupload">
              File_Upload
            </Link>
            <Link className="link-tag" to="/fileversioning">
              File_Version
            </Link>
            <Link className="link-tag" to="/fileviewer">
              File_Viewer
            </Link>
            <Link className="link-tag" to="/imgtotext">
              Image_toText
            </Link>
            <Link className="link-tag" to="/multiplefileupload">
              Multiple_File_Upload
            </Link>
          </div>
        )}
    </div>
    </div>
  );
};
export default AdminAndCustomer;
