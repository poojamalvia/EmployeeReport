import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { db } from "./firebase";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Employeereport() {
  const [reportdata, setreportdata] = useState();
  const ReportCollectionRef = collection(db, "employeesreport");

  const handlechange = (e) => {
    setreportdata({ ...reportdata, [e.target.name]: e.target.value });
  };

  const createemployeereport = async (reportdata) => {
    await addDoc(ReportCollectionRef, {
      
      ename: reportdata.ename,
      desc: reportdata.desc,
      time: reportdata.time,
      date: reportdata.date,
    });

   
  };

  const handleclick = () => {
    createemployeereport(reportdata);

    console.log(reportdata);
  };

 

  const getemployeesreport = async () => {
    const data = await getDocs(ReportCollectionRef);

    let mData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setreportdata(mData);
  };

  useEffect(() => {
    getemployeesreport();
  }, []);


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div>
      <div className="container d-flex justify-content-center  align-items-center vh-50">
        <div className=" card w-50 shadow">
          <h3 className="text-center mb-4"> Employee Daily Report System</h3>

          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <div>
              <div className="mb-3">
                <TextField
                  required
                  style={{ width: "50%" }}
                  id="email"
                  label="Employee Name"
                  type="text"
                  variant="outlined"
                  name="ename"
                  onChange={handlechange}
                />
              </div>

              <div className="mb-3">
                <TextField
                  required
                  style={{ width: "50%" }}
                  id="email"
                  label="Task Description"
                  type="text"
                  name="desc"
                  variant="outlined"
                  onChange={handlechange}
                />
              </div>
              <div className="mb-3">
                <TextField
                  required
                  style={{ width: "50%" }}
                  id="email"
                  label="Hours Worked"
                  type="time"
                  variant="outlined"
                  name="time"
                  onChange={handlechange}
                />
              </div>

              <div className="mb-3">
                <TextField
                  required
                  style={{ width: "50%" }}
                  id="email"
                  label="Date"
                  type="date"
                  name="date"
                  variant="outlined"
                  onChange={handlechange}
                />
              </div>
              <div className="text-center">
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleclick}
                >
                  Submit
                </Button>
              </div>

              {/* <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        /> */}
            </div>
          </Box>
        </div>
        <div></div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee Name</StyledTableCell>
              <StyledTableCell align="right">Task Description</StyledTableCell>
              <StyledTableCell align="right">Hours Worked</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          {reportdata.map((val) => (
            <TableBody>
              <StyledTableRow key={val.ename}>
                <StyledTableCell component="th" scope="row">
                  {val.ename}
                </StyledTableCell>
                <StyledTableCell align="right">{val.desc}</StyledTableCell>
                <StyledTableCell align="right">{val.time}</StyledTableCell>
                <StyledTableCell align="right">{val.date}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
}

export default Employeereport;
