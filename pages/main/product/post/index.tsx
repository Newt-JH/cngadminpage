import React, { useState } from "react";
import Layout from "../../../components/Layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Product = () => {
  
  const [formData, setFormData] = useState({
    category: "암롤박스",
    name: "",
    length: "",
    width: "",
    depth: "",
    hashTag: "",
    steelPlate: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log('File uploaded successfully:', data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }


  return (
    <Layout>
<>
        <br /><br />
        <div>
        <h1 style={{ textAlign: "center" }}>제품 등록</h1>
        

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "0px" }}
        >
          
        <table
          style={{
            borderCollapse: "collapse",
            width: "60%",
            border: "2px solid #f2f2f2",
            marginTop: "30px",
          }}
        >
          <tbody>
            <tr style={{}}>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                구분
              </th>
              <td>
                <select
                  defaultValue="암롤박스"
                  style={{ width: "50%", margin: "0 10px", height: "30px" }}
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="암롤박스">암롤박스</option>
                  <option value="스크랩 박스">스크랩 박스</option>
                  <option value="중고박스">중고박스</option>
                  <option value="수리">수리</option>
                </select>
              </td>
            </tr>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                제품명
              </th>
              <td>
                <input
                  name="name"
                  type="text"
                  style={{ width: "95%", margin: "0 10px", height: "30px" }}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr style={{}}>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                규격
              </th>
              <td style={{ textAlign: "center" }}>
                L :{" "}
                <input
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  type="text"
                  style={{ width: "25%", margin: "0 10px", height: "30px" }}
                />
                W :{" "}
                <input
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  type="text"
                  style={{ width: "25%", margin: "0 10px", height: "30px" }}
                />
                H :{" "}
                <input
                  name="depth"
                  value={formData.depth}
                  onChange={handleInputChange}
                  type="text"
                  style={{ width: "25%", margin: "0 10px", height: "30px" }}
                />
              </td>
            </tr>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                태그명
              </th>
              <td>
                <input
                  name="hashTag"
                  value={formData.hashTag}
                  onChange={handleInputChange}
                  type="text"
                  style={{ width: "30%", margin: "0 10px", height: "30px" }}
                />
              </td>
            </tr>
            <tr style={{}}>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                철판 두께
              </th>
              <td>
                <input
                  name="steelPlate"
                  value={formData.steelPlate}
                  onChange={handleInputChange}
                  type="text"
                  style={{ width: "95%", margin: "0 10px", height: "30px" }}
                />
              </td>
            </tr>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  backgroundColor: "#f2f2f2",
                }}
              >
                기본설명
              </th>
              <td>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  type="text"
                  style={{
                    width: "95%",
                    margin: "0 10px",
                    height: "80px",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      </div>



      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "60%",
            border: "2px solid #f2f2f2",
            marginTop: "30px",
          }}
        >
          <tbody>
          <tr>
  <th
    style={{
      textAlign: "left",
      padding: "10px",
      backgroundColor: "#f2f2f2",
    }}
  >
    이미지 1
  </th>
  <td>
  <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
  </td>
</tr>
<tr>
  <th
    style={{
      textAlign: "left",
      padding: "10px",
      backgroundColor: "#f2f2f2",
    }}
  >
    이미지 2
  </th>
  <td>
    <input
      name="image2"
      type="file"
      accept="image/*"
      style={{ margin: "0 10px", height: "30px" }}
    />
  </td>
</tr>
<tr>
  <th
    style={{
      textAlign: "left",
      padding: "10px",
      backgroundColor: "#f2f2f2",
    }}
  >
    이미지 3
  </th>
  <td>
    <input
      name="image3"
      type="file"
      accept="image/*"
      style={{ margin: "0 10px", height: "30px" }}
    />
  </td>
</tr>
<tr>
  <th
    style={{
      textAlign: "left",
      padding: "10px",
      backgroundColor: "#f2f2f2",
    }}
  >
    이미지 4
  </th>
  <td>
    <input
      name="image4"
      type="file"
      accept="image/*"
      style={{ margin: "0 10px", height: "30px" }}
    />
  </td>
</tr>
<tr>
  <th
    style={{
      textAlign: "left",
      padding: "10px",
      backgroundColor: "#f2f2f2",
    }}
  >
    이미지 5
  </th>
  <td>
    <input
      name="image5"
      type="file"
      accept="image/*"
      style={{ margin: "0 10px", height: "30px" }}
    />
  </td>
</tr>

          </tbody>
        </table>
        </div>
        </>
    </Layout>
  );
};

export default Product;
