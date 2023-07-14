import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Gdata from "./Gdata";
import '../Css/App.css';
const User = () => {
  const gdata = useContext(Gdata);
  return (
    <div className="nav">
      {gdata.islogin && gdata.isuser && (
        <Link className="link-tag" to="/search">
          Search_product
        </Link>
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
  );
};
export default User;