import React, { useState } from "react";
import '../Css/App.css';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
const Signup = () => {
  const navigate=useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
  });
  const { name, email, password, confirmpassword, role } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const rollChangeHandler = (e) => {
    setData({ ...data, role: e.target.value });
  };
  const submitHandler = async (e) => {
    if(!data.name||!data.email||!data.password||!data.role){
      alert("please enter data in all fields");
      return;
    }
    else{
      try {
      console.log(data);
      const response = await axios.post("http://192.168.0.199:5000/register", data);
      console.log(response.data);
     navigate('/Signin');
    } 
    catch (error) {
      console.error(error);
    }
  }
  };
  return (
    <div className="sign-page">
      <span className="title">Signup</span>
      <span className="field">Name:</span>
      <br />
      <input
        className="input"
        type="text"
        name="name"
        placeholder="Enter your name"
        value={name}
        onChange={changeHandler}
      />
      <br />
      <span className="field">Email:</span>
      <br />
      <input
        className="input"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={changeHandler}
      />
      <br />
            <span className="field">Password:</span>
      <br />
      <input
        className="input"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={changeHandler}
      />
      <br />
      <span className="field">Confirm Password:</span>
      <br />
      <input
        className="input"
        type="password"
        name="confirmpassword"
        placeholder="Confirm your password"
        value={confirmpassword}
        onChange={changeHandler}
      />
      <br />

      <label className="field">Role :</label>
      <select
        className="input"
        onChange={rollChangeHandler}
        value={role}
        name="roll"
      >
        <option value="">Select roll</option>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <br />
      <br />
      <button className="submit" onClick={submitHandler}>
        submit
      </button>
    </div>
  );
};
export default Signup;
