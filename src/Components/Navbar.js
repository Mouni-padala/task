import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Gdata from "./Gdata";
const Navbar = () => {
  const gdata = useContext(Gdata);
  console.log(gdata.islogin);
  return (
    <div>
      <div className=" navbar">
        <div>
          {!gdata.islogin && (
            <Link className="link-tag" to="/Signup">
              Signup
            </Link>
          )}
          {!gdata.islogin && (
            <Link className="link-tag" to="/Signin">
              Signin
            </Link>
          )}
        </div>

        
      </div>
    </div>
  );
};
export default Navbar;
