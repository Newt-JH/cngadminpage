import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';

export default function Realease() {

  const [rows,setRows] = useState({
    releaseCount: 0,
    usedCount: 0,
    rentalCount: 0
  })

  const [click, setClick] = useState(false);
  const [error, setError] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(0);

  const getRealeaseCount = async () => {
    try {
      const response = await axios.get('/api/admin/realease/get', {
        params: {
          // 필요한 경우 매개변수를 추가합니다.
        }
      });
      await setRows(response.data.data[0]);
      console.log(response.data.data[0]);
    } catch (error) {
      setError(error);
    }
  }

  const handleClick = async () => {
    if (!click) {
      setClick(true);
    } else {
      if (confirm("수정하시겠습니까?")) {
          try {
            const response = await axios.put('/api/admin/realease/put', {
              // 필요한 경우 매개변수를 추가합니다.
                releaseCount: rows.releaseCount,
                usedCount : rows.usedCount,
                rentalCount : rows.rentalCount,
            });
            location.reload();
            alert('수정 완료되었습니다.');
            setPageRefresh(count => 
              count + 1
            )
          } catch (error) {
            setError(error);
          }
      };
    }      
  };

  const handleInputChange = (e) => {
    e.target.value = Number(e.target.value) < 100 ? Number(e.target.value) : 99;
    setRows((prevRows) => ({
      ...prevRows,
      [e.target.id]: Number(e.target.value)
    }));
  };

  useEffect(() => {
    getRealeaseCount();
  },[pageRefresh])

  return (
    <Layout>
      <>
      <br /><br />
        <h1 align="center">  &nbsp; 실시간 제품 현황 관리 </h1>
        <br /><br />
    <TableContainer component={Paper} align="center">
      <Table sx={{ width: 800 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">즉시 출고 가능</StyledTableCell>
            <StyledTableCell align="center">즉시 판매 가능 ( 중고 )</StyledTableCell>
            <StyledTableCell align="center">렌탈 가능</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              <StyledTableRow key={rows}>
                
                <StyledTableCell align="center">
                  {click === false ? rows.releaseCount :
                    <TextField type={"number"} id="releaseCount" label="" variant="standard" value={rows.releaseCount} onChange={handleInputChange}/>
                  }
                </StyledTableCell>

                <StyledTableCell align="center">
                  {click === false ? rows.usedCount :
                    <TextField type={"number"} id="usedCount" label="" variant="standard" value={rows.usedCount} onChange={handleInputChange}/>
                  }
                </StyledTableCell>

                <StyledTableCell align="center">
                  {click === false ? rows.rentalCount :
                    <TextField type={"number"} id="rentalCount" label="" variant="standard" value={rows.rentalCount} onChange={handleInputChange}/>
                  }
                </StyledTableCell>

            </StyledTableRow>
        </TableBody>
          </Table>

          <br /><br />
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained"
              style={{ marginRight: "50px" }}
              sx={{width: 100, height: 60}}
              onClick={handleClick}
              >
              {click === false ? '수정' : '저장'}
            </Button>
          </Box>
          <br /><br />
      </TableContainer>

      </>
      </Layout>
  );
}















const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 23,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));