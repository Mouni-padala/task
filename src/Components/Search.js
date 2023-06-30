import React, { useState } from "react";
import axios from "axios";
import "../Css/App.css";
const SearchFilter = () => {
  const [Search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  const token = localStorage.getItem("auth");
  const submitHandler = async () => {
    try {
      const response = await axios.get(`http://192.168.0.199:5000/getdata`, {
        headers: {
          auth: token,
        },
      });
      const filteredResult = response.data.filter((result) =>
        result.product_name.toLowerCase().includes(Search.toLowerCase())
      );
      setsearchResult([...filteredResult]);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItem = async (data) => {
    console.log(data);
    const response = await axios.delete(
      `http://192.168.0.173:4000/delete/${data}`,
      {
        headers: {
          auth: token,
        },
      }
    );
    console.log(response.data);
  };

  return (
    <div>
      <center>
        <h1 className="head">Search The Products</h1>
        <input
          type="text"
          value={Search}
          name="Search"
          placeholder="Search for your product..."
          onChange={searchHandler}
          className="search-box"
        />
        <br />
        <br />
        <button className="submit-page1" onClick={submitHandler}>
          submit
        </button>
        <br />
        <br />
        <div>
          <table>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Rating</th>
              <th>Product Description</th>
              <th>Remove</th>
            </tr>
            {searchResult.map((result) => (
              <tr className="table-tag">
                <td>{result._id}</td>
                <td>{result.product_name}</td>
                <td>{result.product_price}</td>
                <td>{result.product_rating}</td>
                <td>{result.product_disp}</td>
                <td>
                  <button
                    className="delete-tag"
                    onClick={() => {
                      deleteItem(result._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </center>
    </div>
  );
};
export default SearchFilter;
