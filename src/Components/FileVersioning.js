
import React, { useState } from "react";
import axios from "axios";
import "../Css/App.css";
import Config from '../Config';
const FileVersioning = () => {
  console.log(Config.getversion)
  const [fileData, setFileData] = useState({
    fileName: "",
    version: "",
  });
  const [file, setFile] = useState([]);
  const [updatedVersion, setUpdatedVersion] = useState("");

  const getVersion = (e) => {
    setFileData({ ...fileData, [e.target.name]: e.target.value });
  };

  const totalUploadedFiles = async () => {
    const res = await axios.get(process.env.REACT_APP_TOTAL_FILES_API);
    setFile([...file, ...res.data.data]);
  };

  const getFileVersion = async () => {
    const response = await axios.get(
      `${Config.getversion}/version?version=${fileData.version}&&filename=${fileData.fileName}`
    );
    setUpdatedVersion(response.data.data);
  };

  return (
    <div className="file-versioning-container">
      <div className="file-list">
        <span>Click below to get all files:</span>
        <br />
        <br />
        <button className="submit-button" onClick={totalUploadedFiles}>
          Total Uploaded Files
        </button>
        <br />
        {file.map((item, index) => {
          return (
            <div key={index} className="file-item">
              <div className="file-name">{item.filename}</div>
              <table className="file-versions-table">
                <tbody>
                  {item.version.map((value, index) => (
                    <tr key={index}>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <div className="version-page">
        FileName:
        <br />
        <input
          type="text"
          placeholder="Enter the FileName"
          name="fileName"
          onChange={getVersion}
        />
        <br />
        Version:
        <br />
        <input
          type="text"
          placeholder="Enter the version"
          name="version"
          onChange={getVersion}
        />
        <br />
        <br />
        <button className="submit-button" onClick={getFileVersion}>
          Get Version
        </button>
        <div className="version-update">{updatedVersion}</div>
      </div>
    </div>
  );
};
export default FileVersioning;
