import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";


const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
    .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),
      
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      role: "",
    },
  });
  const onSubmit = async (values) => {
    console.log("from useform", values);
    try {
      const response = await axios.post(
        process.env.REACT_APP_SIGNUP_API,
        values
      );
      console.log(response.data);
      alert("Successfully registered!");
      navigate("/Signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sign-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className="title">Signup</legend>
          <div className="form-group">
            <label className="field">Name:</label>
            <input className="input" type="text" {...register("name")} />
            <error>{errors.name && <span>{errors.name.message}</span>}</error>
          </div>
          <div className="form-group">
            <label className="field">Email:</label>
            <input className="input" type="email" {...register("email")} />
            <error>{errors.email && <span>{errors.email.message}</span>}</error>
          </div>
          <div className="form-group">
            <label className="field">Password:</label>
            <input
              className="input"
              type="password"
              {...register("password")}
            />
            <error>
              {errors.password && <span>{errors.password.message}</span>}
            </error>
          </div>
          <div className="form-group">
            <label className="field">Confirm Password:</label>
            <input
              className="input"
              type="password"
              {...register("confirmpassword")}
            />
            <error>
              {errors.confirmpassword && (
                <span>{errors.confirmpassword.message}</span>
              )}
            </error>
          </div>
          <div className="form-group">
            <label className="field">Role:</label>
            <select className="input" {...register("role")}>
              <option value="">Select role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <error>{errors.role && <span>{errors.role.message}</span>}</error>
          </div>
          <input type="submit" className="submit" value="Submit" />
        </fieldset>
      </form>
    </div>
  );
};
export default Signup;