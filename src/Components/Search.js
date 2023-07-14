// import React, { useState, useEffect ,useContext} from "react";
// import axios from "axios";
// import { Pie } from 'react-chartjs-2';
// import "../Css/App.css";
// import Config from '../Config';
// import Chart from 'chart.js/auto';
// import ChartGraph from './ChartGraph';
// import Gdata from "./Gdata";
// import UpdateProduct from './UpdateProduct';
// import {useNavigate} from 'react-router-dom';
// const SearchFilter = () => {
//   const gdata = useContext(Gdata);
// const navigate=useNavigate();
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [allData, setAllData] = useState([]);
//   const [mobileCount, setMobileCount] = useState(0);
//   const [laptopCount, setLaptopCount] = useState(0);

//   const searchHandler = (e) => {
//     setSearch(e.target.value);
//   };

//   const token = localStorage.getItem("auth");

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(Config.search, {
//         headers: {
//           auth: token,
//         },
//       });
//       setAllData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [searchResult]);

//   useEffect(() => {
//     const mobiles = allData.filter((result) =>
//       result.product_name.toLowerCase().includes("mobile")
//     );
//     setMobileCount(mobiles.length);

//     const laptops = allData.filter((result) =>
//       result.product_name.toLowerCase().includes("laptop")
//     );
//     setLaptopCount(laptops.length);
//     <ChartGraph data={pieChartData} />
//   }, [allData]);

//   const filterData = () => {
//     const filteredResult = allData.filter((result) =>
//       result.product_name.toLowerCase().includes(search.toLowerCase())
//     );
//     setSearchResult(filteredResult);
//   };

//   const deleteItem = async (id) => {
//     try {
//       if(gdata.isadmin){
//       await axios.delete(`${Config.delete}/${id}`, {
//         headers: {
//           auth: token,
//         },
//       });
//       setSearchResult((prevResults) =>
//         prevResults.filter((result) => result._id !== id)
//       );}
//       else{
//         alert("You are not authorized to delete this Product");
//       }
//     } catch (error) {
//       console.log("axios error", error);
//     }
//   };
// const updateItem=(data)=>{
//   gdata.updategdata({...gdata,updateProductData:{...data}})
//   console.log(gdata);
//   if(gdata.isadmin){navigate('/updateproduct')}
//   else{
//     alert('You are not authorized to update this Product');
// }
// }
//   const pieChartData = {
//     labels: ['Mobiles', 'Laptops'],
//     datasets: [
//       {
//         lable:"product data",
//         data: [mobileCount, laptopCount],
//         backgroundColor: ['grey', 'orange'],
//       },
//     ],
//   };
//   if(gdata.isadmin){ var adminclass="search-tag"}

//   return (
//     <div className={adminclass}>
//       <div>
//         <center>
//         <h1 className="head">Search The Products</h1>
//         <input
//           type="text"
//           value={search}
//           name="search"
//           placeholder="Search for your product..."
//           onChange={searchHandler}
//           className="search-box"
//         />
//         <br />
//         <br />
//         <button className="submit-page1" onClick={filterData}>
//           Search
//         </button>
//         <br />
//         <br />
//         <div className="table-tag">
//           <table>
//             <thead>
//               <tr>
//                 <th>Count</th>
//                 <th>Product Name</th>
//                 <th>Product Price</th>
//                 <th>Product Rating</th>
//                 <th>Product Description</th>
//                 <th>Remove</th>
//                 <th>Update</th>
//               </tr>
//             </thead>
//             <tbody>
//               {(search !== "" ? searchResult : allData).map((result, index) => (
//                 <tr className="table-tag" key={result._id}>
//                   <td>{index +1}</td>
//                   <td>{result.product_name}</td>
//                   <td>{result.product_price}</td>
//                   <td>{result.product_rating}</td>
//                   <td>{result.product_disp}</td>
//                   <td>
//                     <button
//                       className="delete-tag"
//                       onClick={() => deleteItem(result._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                   <td>
//                     <button
//                       className="update-tag"
//                       onClick={() => updateItem(result)}
//                     >
//                       update
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         </center>
//         </div>

//         <div style={{ height: 200, width: 400, margin: 'auto' }}>
//           {/* <Pie data={pieChartData} key={Math.random()} /> */}
//           {gdata.isadmin&&<ChartGraph data={pieChartData}  />}
//         </div>

//     </div>
//   );
// };
// export default SearchFilter;

import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import "../Css/App.css";
import Config from "../Config";
import Chart from "chart.js/auto";
import Gdata from "./Gdata";
import UpdateProduct from "./UpdateProduct";
import { useNavigate } from "react-router-dom";

const SearchFilter = () => {
  const gdata = useContext(Gdata);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [allData, setAllData] = useState([]);
  const [mobileCount, setMobileCount] = useState(0);
  const [laptopCount, setLaptopCount] = useState(0);
  const [productCount, setProductCount] = useState({});
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const token = localStorage.getItem("auth");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Config.search, {
          headers: {
            auth: token,
          },
        });
        setAllData(response.data);

        const countByProduct = response.data.reduce((count, result) => {
          const productName = result.product_name.toLowerCase();
          count[productName] = (count[productName] || 0) + 1;
          return count;
        }, {});

        setProductCount(countByProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchResult]);

  useEffect(() => {
    const mobiles = allData.filter((result) =>
      result.product_name.toLowerCase().includes("mobile")
    );
    setMobileCount(mobiles.length);

    const laptops = allData.filter((result) =>
      result.product_name.toLowerCase().includes("laptop")
    );
    setLaptopCount(laptops.length);
  }, [allData]);

  const filterData = () => {
    const filteredResult = allData.filter((result) =>
      result.product_name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredResult);
  };

  const deleteItem = async (id) => {
    try {
      if (gdata.isadmin) {
        await axios.delete(`${Config.delete}/${id}`, {
          headers: {
            auth: token,
          },
        });
        setSearchResult((prevResults) =>
          prevResults.filter((result) => result._id !== id)
        );
      } else {
        alert("You are not authorized to delete this Product");
      }
    } catch (error) {
      console.log("axios error", error);
    }
  };

  const updateItem = (data) => {
    gdata.updategdata({ ...gdata, updateProductData: { ...data } });
    console.log(gdata);
    if (gdata.isadmin) {
      navigate("/updateproduct");
    } else {
      alert("You are not authorized to update this Product");
    }
  };

  useEffect(() => {
    if (Object.keys(productCount).length > 0) {
      const ctx = canvasRef.current.getContext("2d");
      chartInstanceRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: Object.keys(productCount),
          datasets: [
            {
              label: "Product Data",
              data: Object.values(productCount),
              backgroundColor: [
                "grey",
                "wheat",
                "oldlace",
                "rosybrown",
                "whitesmoke",
                "lightblue",
                "#45a049",
                "pink",
                "skyblue",
                "rgb(71, 71, 143)",
              ],
            },
          ],
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [productCount]);

  if (gdata.isadmin) {
    var adminclass = "search-tag";
  }

  return (
    <div className={adminclass}>
      <div>
        <center>
          <h1 className="head">Search The Products</h1>
          <input
            type="text"
            value={search}
            name="search"
            placeholder="Search for your product..."
            onChange={searchHandler}
            className="search-box"
          />
          <br />
          <br />
          <button className="submit-page1" onClick={filterData}>
            Search
          </button>
          <br />
          <br />
          <div className="table-tag">
            <table>
              <thead>
                <tr>
                  <th>Count</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Rating</th>
                  <th>Product Description</th>
                  <th>Remove</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {(search !== "" ? searchResult : allData).map(
                  (result, index) => (
                    <tr className="table-tag" key={result._id}>
                      <td>{index + 1}</td>
                      <td>{result.product_name}</td>
                      <td>{result.product_price}</td>
                      <td>{result.product_rating}</td>
                      <td>{result.product_disp}</td>
                      <td>
                        <button
                          className="delete-tag"
                          onClick={() => deleteItem(result._id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          className="update-tag"
                          onClick={() => updateItem(result)}
                        >
                          update
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </center>
      </div>
      {gdata.isadmin && (
        <div style={{ height: 400, width: 600, margin: "auto" }}>
          {Object.keys(productCount).length > 0 && (
            <canvas ref={canvasRef} />
          )}
        </div>
      )}</div>
  );
};

export default SearchFilter;



