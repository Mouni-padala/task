import React, { useState,useContext } from "react";
import '../Css/App.css';
import axios from "axios";
import Gdata from './Gdata'
import {Link,useNavigate} from 'react-router-dom';
const Signin = () => {
  const gdata=useContext(Gdata)
    const navigate=useNavigate();
  const [details, setDetails] = useState({
    "email": "",
    "password": "",
    "islogin":false
  });
  const loginChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const getdata = async () => {
    if (!details.email || !details.password) {
      alert("Please enter data in all fields");
      return; 
    }
    else{
       try{ console.log(details)
      const response = await axios.post(
        "http://192.168.0.199:5000/login",
        details
      );
      console.log(response.data.athantication.token);
      localStorage.setItem('auth',response.data.athantication.token);
      gdata.updategdata({...gdata,"islogin":true})
      navigate('/Image')
    }
    catch(error){
      console.log(error);
    }
    }
  };
  return (
    <div className="sign-page">
      <span className="title2">Signin</span>
        <span className="field">Email:</span>
        <br />
        <input
          className="input"
          type="email"
          name="email"
          onChange={loginChange}
          placeholder="Enter your email"
        />
        <br />
        <span className="field">Password:</span>
        <br />
        <input
          className="input"
          type="password"
          name="password"
          onChange={loginChange}
          placeholder="Enter your password"
        />
        <Link to='/changepassword'>forgot password</Link>
        <br />
        <br />
        <button onClick={getdata} className="submit">
          Login
        </button>
    </div>
  );
};
export default Signin;
