import React,{useState} from 'react';
import Layout from '../../../components/Layout';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Product = () => {

  const today = new Date(); // 현재 날짜와 시간을 가져옴
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  const oneYearAgoISOString = oneYearAgo.toISOString().substr(0, 10);


  const [startDate, setStartDate] = useState(oneYearAgoISOString);
  const [endDate, setEndDate] = useState(new Date().toISOString().substr(0, 10));
  const [productName, setProductName] = useState('');
  const [pageNum, setPageNum] = useState(1);


  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    marginTop: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  };

  const inputStyle = {
    marginLeft: '10px',
    marginRight: '10px',
    width: '140px',
    height: '30px',
  };

  const textinputStyle = {
    marginLeft: '10px',
    marginRight: '10px',
    width: '200px',
    height: '30px',
  };

  const textStyle = {
    marginLeft: '30px',
  };

  const buttonStyle = {
    marginLeft: '20px',
    backgroundColor: "#000",
    color: "#fff",
    padding: "8px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

    const [data, setData] = useState([]);

    const getProduct = async () => {
      try {
        const response = await axios.get('/api/admin/product/get', {
          params: {
            // 필요한 경우 매개변수를 추가합니다.
            offset: pageNum
          }
        });

        await setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    const searchProduct = async () => {
      try {
        const response = await axios.get('/api/admin/product/search/get', {
          params: {
            // 필요한 경우 매개변수를 추가합니다.
            createDateTime: startDate,
            updateDateTime: endDate,
            searchText: productName,
            offset: pageNum
          }
        });

        await setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getProduct();
    }, [pageNum])
  
  
  const [startPage, setStartPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);

  const handlePrevClick = () => {
    if (pageNum > 1) {
      setPageNum((prevPage) => prevPage - 1);
      if (startPage > 1) {
        setStartPage((prevPage) => prevPage - 1);
      }
    }
  };

  const handleNextClick = () => {
    if (pageNum < maxPage) {
      setPageNum((prevPage) => prevPage + 1);
      if (startPage + 9 < maxPage) {
        setStartPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handlePageClick = (page) => {
    setPageNum(page);
    if (page > 5 && page + 4 <= maxPage) {
      setStartPage(page - 4);
    } else if (page <= 5) {
      setStartPage(1);
    } else {
      setStartPage(maxPage - 9);
    }
  };

  const handleDeleteClick = async () => {
    const productIDList = myArray.toString();
    console.log(productIDList);
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete('/api/admin/product/del', {
          params: {
            // 필요한 경우 매개변수를 추가합니다.
            productIDList: myArray.toString()
          }
        });
        alert("삭제 완료되었습니다.");
        await getProduct();
      } catch (error) {
        console.log(error);
      }
    }

  }

  const router = useRouter();

  function InsertPageHandler() {
    router.push('/main/product/detail');
  }

  

  const [myArray, setMyArray] = useState([]);

  function myFunction(event,productID) {
    if (event) {
      setMyArray(prevArray => [...prevArray, productID]);
    } else {
      setMyArray(prevArray => prevArray.filter(id => id !== productID));
    }

  }
  
  
    return (
      <Layout>
        <div style={boxStyle}>
          등록일  <input
            type="date"
            style={inputStyle}
            value={startDate}
            onChange={handleStartDateChange}
            placeholder="Enter value 1"
          />
          - <input
            type="date"
            style={inputStyle}
            value={endDate}
            onChange={handleEndDateChange}
            placeholder="Enter value 2"
          />
          <p style={textStyle}>제품명</p> <input
            type="text"
            style={textinputStyle}
            value={productName}
            onChange={handleProductNameChange}
            placeholder="제품명을 입력해주세요."
          />
          <button style={buttonStyle} onClick={searchProduct}>
            검색
          </button>
        </div>
      
        <div style={{ margin: "30px auto", width: "80%" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", border: "2px solid #f2f2f2" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ textAlign: "center", padding: "10px" }}>선택</th>
                <th style={{ textAlign: "center", padding: "10px" }}>no</th>
                <th style={{ textAlign: "center", padding: "10px" }}>제품명</th>
                <th style={{ textAlign: "center", padding: "10px" }}>이미지</th>
                <th style={{ textAlign: "center", padding: "10px" }}>등록일</th>
                <th style={{ textAlign: "center", padding: "10px" }}>수정일</th>
                <th style={{ textAlign: "center", padding: "10px" }}>조회수</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} style={{ borderTop: "1px solid #f2f2f2", height: "100px" }}>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                  <input type="checkbox"    onChange={(event) => {
    // event.target.checked를 이용해 체크 여부를 확인할 수 있습니다.
    
    myFunction(event.target.checked,item.productID);
  }} style={{ width: "20px", height: "20px", border: "2px solid #ccc", borderRadius: "50%", backgroundColor: "#fff", cursor: "pointer" }}/>
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>{item.productID}</td>
                  <td style={{ textAlign: "center", padding: "10px" }}>{item.name}</td>
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <img src={item.titleImage} alt="" style={{ height: "100px" }} />
                  </td>
                  <td style={{ textAlign: "center", padding: "10px" }}>{item.createDateTime.slice(0, 10)}</td>
                  <td style={{ textAlign: "center", padding: "10px" }}>{item.lastUpdateDateTime.slice(0, 10)}</td>
                  <td style={{ textAlign: "center", padding: "10px" }}>{item.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
        <div style={{ display: 'flex', justifyContent: 'center' }}>
  <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
    <button
      style={{
        padding: "8px",
        marginRight: "16px",
        background: "none",
        border: "1px solid #000",
        color: "#000",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        outline: "none"
      }}
      onClick={handleDeleteClick}
    >
      삭제
    </button>
            
            <button
      style={{
        padding: "8px",
        marginRight: "8px",
        background: "none",
        border: "none",
        color: "#000",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        outline: "none"
      }}
      disabled={pageNum === 1}
      onClick={handlePrevClick}
    >
      {"<"}
    </button>
    <div style={{ display: "flex" }}>
      {Array.from({ length: Math.min(maxPage, 10) }, (_, i) => i + startPage).map((page) => (
        <span
          key={page}
          style={{
            margin: '0 4px',
            fontWeight: page === pageNum ? 'bold' : 'normal',
            cursor: 'pointer',
          }}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </span>
      ))}
    </div>
    <button
      style={{
        padding: "8px",
        marginLeft: "16px",
        background: "none",
        border: "none",
        color: pageNum === maxPage ? "#ccc" : "#000",
        cursor: pageNum === maxPage ? "not-allowed" : "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        outline: "none"
      }}
      disabled={pageNum === maxPage}
      onClick={handleNextClick}
    >
      {">"}
    </button>

    <button
      style={{
        padding: "8px",
        marginLeft: "16px",
        background: "none",
        border: "1px solid #000",
        color: "#000",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        outline: "none"
      }}
      onClick={InsertPageHandler}
    >
      신규등록
    </button>
  </div>
</div>



        
      </Layout>
    );
  };

export default Product;
