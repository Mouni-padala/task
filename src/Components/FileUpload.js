import React, { useState } from "react";
import "../Css/App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Config from '../Config';
const FileUpload = () => {
  console.log(Config.fileupload)

  const navigate = useNavigate();
  const [File, setFile] = useState("");
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files);
  };
  const handleapi = async () => {
    const formData = new FormData();
    formData.append("file", File);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_FILE_UPLOAD_API,
        formData,
        config
      );
      console.log(response.data);
      alert("File Upoladed!!")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <center>
        <div className="image-page">
          <input className="image-search" type="file" name="file" onChange={handleFile} /> <br />
          <br />
          <button className="submit-page" onClick={handleapi}>
            submit
          </button>
        </div>
      </center>
    </div>
  );
};
export default FileUpload;
