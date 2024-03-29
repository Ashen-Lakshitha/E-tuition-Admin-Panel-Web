import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { 
  Typography, 
  Button, 
  styled } from '@mui/material';

import {base_url} from '../../Const/Const';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  ['&.${tableCellClasses.head}']: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  ['&.${tableCellClasses.body}']: {
    fontSize: 14,
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


export default function StudentTable({data, updated, setUpdated}) {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();


  const handleSubmit = (userid) => {
    setIsLoading(true);
    setError(null);
    
    fetch(base_url+'/admin/'+userid+'/verify', {
            method: 'PUT',
            headers: {"Content-Type":"application/json", "Authorization": "Bearer " + localStorage.getItem('token')},
        }).then(res=>{
          setIsLoading(true);
          return res.json();
        })
        .then(data=>{
            setIsLoading(false);
            if(!data['success']){
                setError(data['error']);
                return;
            }else{
                setUpdated(!updated);
            }
            
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log('Fetch aborted');
            }else{
                setIsLoading(false);
                setError(err.message);
            }
        })
  };

  return (
      <Box 
        display='flex'
        flexDirection='column'
        sx={{ mt: 4, width:'100%'}}  
     >
        {data && data.length === 0 &&<Box
        marginTop = {2}
        marginBottom = {2}
        display='flex'
        flexWrap="wrap"
        paddingLeft={2}
        paddingTop={1}
        paddingBottom={1}
        sx={{justifyContent:'center'}}>
            <Typography>No user to Verify</Typography>
            </Box> }

        {data && data.length !== 0 && <TableContainer sx={{  mt: 1}} component={Paper}>
          <Table  size="small" aria-label="customized table">
            <TableHead sx={{backgroundColor: "#3F51B5"}}>
              <TableRow Color= "white">
                <StyledTableCell align="center"><Typography color= "white">Photo</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Name</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Email</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Status</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Proof</Typography></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Approve</Typography></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
              ).map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center" >
                  <Box
                    display='flex'
                    flexDirection='row'
                    sx={{justifyContent:'center'}}
                  >
                    <Avatar alt="John Doe" src={row.photo.webContentLink}/>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
        
          
                  <StyledTableCell align="center"><Box
                  sx={{justifyContent:'right', mt:0}}
                  >
                  <Button sx={{backgroundColor:'yellow',color:'blue',borderRadius:5}} disabledElavation>
                     Pending
                  </Button>          
                  </Box></StyledTableCell>

                  <StyledTableCell align="center" >
                  <Box
                    display='flex'
                    flexDirection='row'
                    sx={{justifyContent:'center'}}
                  >
                    <a href = {row.verification.webViewLink} rel='noreferrer' target="_blank">view proof documents</a>
                    
                    </Box>
                  </StyledTableCell>
          
                  <StyledTableCell align="center">
                  <Box
                    sx={{justifyContent:'right', mt:0}}
                  >
                    <Button variant="contained" onClick={()=>{
                      navigate("/admin/adminteacherdetails/"+row._id)
                    }}
                    sx={{backgroundColor:"#3F51B5",color:"white"}}>
                        view
                    </Button>          
                  </Box>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                  <Box
                    sx={{justifyContent:'right', mt:0}}
                  >
                    <Button variant="contained" onClick={()=>handleSubmit(row._id)}
                    sx={{backgroundColor:"#3F51B5",color:"white"}}>
                        Verify
                    </Button>          
                  </Box>
                  </StyledTableCell>
                  
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter sx={{backgroundColor: "white"}}>
              <TableRow>
                    <TablePagination
                    rowsPerPageOptions={[1,2,3,4,5,6,7]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page"
                      }
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ page }) => {
                      return `Page: ${page}`;
                    }}
                    backIconButtonProps={{
                      color: "secondary"
                    }}
                    nextIconButtonProps={{ color: "secondary" }}
                    showFirstButton={true}
                    showLastButton={true}
                    labelRowsPerPage={<span>Rows:</span>}
                    sx={{
                      ".MuiTablePagination-toolbar": {
                        backgroundColor: "#f2f2f2"
                      },
                      ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                        fontWeight: "bold",
                        color: "blue"
                      }
                    }}
                    >

                    </TablePagination>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>}     
      </Box>
  );
}
