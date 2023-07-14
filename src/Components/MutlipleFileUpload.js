import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import '../Css/App.css';
const MultipleFileUpload = () => {
  const [files, setFiles] = useState();

  const handleChange = (event) => {
    setFiles(event.target.files);
    console.log(files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]);
      
    }
//    console.log(formData);
    try {
        
      const response = await axios.post('http://192.168.0.207:4000/archiver', formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        }});
      console.log("response", response.data);
      alert("Uploaded all files successfully!!")
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    console.log(files);
    
  }, [files]);

  return (
    <div>
        <center>
    <div className="image-page">
      <input type="file" multiple name="files" className="image-search" onChange={handleChange} /><br/><br/>
      <button className="submit-page" onClick={handleUpload}>upload</button>
    </div>
    </center>
    </div>
  );
};

export default MultipleFileUpload;


// import React, { useState } from 'react';
// import axios from 'axios';
// const MultipleFileUpload = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleFileChange = (event) => {
//     setSelectedFiles([...event.target.files]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     selectedFiles.forEach((file) => {
//       formData.append('files', file);
//     });

//     try {
//         const response = await axios.get('http://192.168.0.200:4000/archiver', formData, {
//                headers: {
//                 "Content-Type": "multipart/form-data", 
//            }});
//       // Handle the response from the server
//       if (response.status) {
//         console.log('Files uploaded successfully');
//       } else {
//         console.log('Error uploading files');
//       }
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Multiple File Upload</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="file" multiple onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// };

// export default MultipleFileUpload;
