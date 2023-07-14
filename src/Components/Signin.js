import React, { useState, useContext } from "react";
import "../Css/App.css";
import axios from "axios";
import Gdata from "./Gdata";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const gdata = useContext(Gdata);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    islogin: false,
  });

  const loginChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const getdata = async () => {
    if (!details.email || !details.password) {
      alert("Please enter data in all fields");
      return;
    } else {
      try {
        console.log(details);
        const response = await axios.post(
          process.env.REACT_APP_LOGIN_API,
          details
        );
        console.log(response.data);
        console.log(response.data.authentication.token);
        console.log(response.data.authentication.role);
        const role = response.data.authentication.role;
        localStorage.setItem("auth", response.data.authentication.token);
        if (role === "admin") {
          gdata.updategdata({ ...gdata, islogin: true, isadmin: true });
          navigate("/admin/customer");
        } else if (role === "customer") {
          gdata.updategdata({ ...gdata, islogin: true, iscustomer: true });
          navigate("/admin/customer");
        } else if (role === "user") {
          gdata.updategdata({ ...gdata, islogin: true, isuser: true });
          navigate("/user");
        }
        console.log(gdata);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="Login-page">
      <fieldset className="form-fieldset">
        <legend className="title2">Sign In</legend>
        <div className="form-group">
          <label className="field2">Email:</label>
          <br />
          <input
            className="input2"
            type="email"
            name="email"
            onChange={loginChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label className="field2">Password:</label>
          <br />
          <input
            className="input2"
            type="password"
            name="password"
            onChange={loginChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <Link to="/changepassword" className="forgot-password">
            Forgot password?
          </Link>
        </div>
        <div className="form-group">
          <button onClick={getdata} className="submit2">
            Login
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default Signin;
