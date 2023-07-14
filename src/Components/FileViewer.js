import React,{useState} from 'react';
import '../Css/App.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Config from '../Config';
const FileViewer=()=>{
  console.log(Config.fileviewer)
  const navigate=useNavigate();
  
  const [image,setImage]=useState('')
  const [responseData, setResponseData] = useState(null);
  const handleImage=(e)=>{
    setImage(e.target.files[0]);
    console.log(e.target.files);
  }
  const handleapi=async()=>{
    const formData=new FormData();
    formData.append('file',image)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    };
try{
    const response=await axios.post('http://192.168.0.207:4000/file',formData,config)
        setResponseData(response.data);
}
catch(error){
  
  console.log(error);
}
  }
  return(
    <div>
      <center>
    <div className="image-page">
      <input type="file" name="file" onChange={handleImage}/> <br/><br/>
      <button className="submit-page" onClick={handleapi}>view</button>
    </div>
      {responseData}
    </center>
    </div>
  )
}
export default FileViewer;