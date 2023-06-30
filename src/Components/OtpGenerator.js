import React,{useState} from 'react';
import axios from 'axios';
const OtpGenerator=()=>{
    const [otp,setOtp]=useState('');
    const generateotp=()=>{
        axios.get('http://localhost:3300/api/auth/otp').then(res=>{
            const generatedotp=res.data.otp;
            setOtp(generatedotp);
        })
    }
    return(
        <div>
            <button onClick={generateotp}>Generate OTP</button>
            {otp&& <p>Generated OTP: {otp}</p>}
        </div>
    );
}
export default OtpGenerator;