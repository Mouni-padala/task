import React,{useState} from 'react';
import axios from 'axios';
import '../Css/App.css';
const ChangePassword=()=>{
    const[password,ResetPassword]=useState({
        Password:''
    })
    const passwordHandler=(event)=>{
        ResetPassword({...password,[event.target.name]:event.target.value})
    }
    console.log(password);
    const changeHandler=async()=>{
    
        const res= await axios.post('http://192.168.0.183/api/auth/change-password/647d747425ebd94072b84247',password)
        console.log(res);
    }
    return(
        <div>
            <center>
        <div className="reset-password-page">
        <span className="field-password-page">Change Password:</span>
            <input type="password" className="input-tag" name="Password" onChange={passwordHandler} placeholder="Reset your password..."/><br/><br/>
            <button className="reset" onClick={changeHandler} >Reset Password</button>
        </div>
        </center>
        </div>
    )
}
export default ChangePassword;