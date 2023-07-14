
import React, { useState } from "react";
import "../Css/App.css";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [textData, setTextData] = useState([]);
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files);
  };

  const handleApi = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        "http://192.168.0.207:4000/imgtotext",
        formData,
        config
      );
      console.log(response.data.textData);
      console.log(response.data.specificData);
      setTextData(response.data.textData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <center>
        <div className="image-page">
          <input
            className="image-search"
            type="file"
            name="file"
            onChange={handleFile}
          />
          <br />
          <br />
          <button className="submit-page" onClick={handleApi}>
            Submit
          </button>
        </div>

        <ul>
          
          {textData.map((value, index) => (
    
            <div key={index}>{value}</div>
          
          ))}
        </ul>
      </center>
    </div>
  );
};

export default FileUpload;
