import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Gdata from './Gdata';
const Navbar=()=>{
    const gdata =useContext(Gdata);
    console.log(gdata.islogin)
    return(<div >
        {!gdata.islogin && (
            <div className="navbar">
              <Link  className="link-tag" to="/Signup">Signup</Link>
              Welcome
              <Link  className="link-tag" to="/Signin">Signin</Link>
            </div>
          )}
          
    </div>)
}
export default Navbar;