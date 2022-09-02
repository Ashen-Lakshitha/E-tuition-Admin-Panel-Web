import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Typography, Button } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box } from '@mui/system';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';


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


export default function TeacherTable({data}) {
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

  return (
      <Box 
        display='flex'
        flexDirection='column'
        sx={{ mt: 4, width:'100%'}}  
     >

        {data &&<TableContainer sx={{  mt: 1}} component={Paper}>
          <Table  size="small" aria-label="customized table">
            <TableHead sx={{backgroundColor: "#3F51B5"}}>
              <TableRow Color= "white">
              <StyledTableCell align="center"><Typography color= "white">Photo</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Name</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Email</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Status</Typography></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
              ).map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">
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
                  {row.isPending.toString() === 'false' && (
                  <StyledTableCell align="center">Verified</StyledTableCell>
                  )}
                  {row.isPending.toString() !== 'false' && (
                  <StyledTableCell align="center">Pending</StyledTableCell>
                  )}
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
                    //ActionsComponent={TablePaginationActions}
                    //component={Box}
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




// import * as React from 'react';
// import DataTable from './DataTable';
// import { DataGrid } from '@mui/x-data-grid';
// import { useState, useEffect } from "react";
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import useFetch from '../../services/useFetch';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { base_url } from '../../Const/Const';
// import Edit from '@mui/icons-material/Edit';
// import IconButton from '@mui/material/IconButton';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { useHistory,useParams } from 'react-router-dom';
// import CircularProgress from '@mui/material/CircularProgress';


// const TeacherTable = () => {
//   const history = useHistory();
//   const { subjectid } = useParams();

//   const {data, isLoading, error} = useFetch(base_url + '/admin/teachers'); 
//   console.log(data);

//   const MatEdit = ({index}) =>{
//     const handleEditClick = () => {
      
//     }
  
//     return <FormControlLabel
//               control={
//                 <IconButton  onClick={()=>{
//                   history.push("/teacherdetails/"+index);
//                   console.log(index);
//                  }}>
//                   <Edit/>
//                 </IconButton>
//               }
//             />
//   };
              
//   const columns = [
//     { field: '_id', headerName: 'ID', width: 90 , hide:true},
//     {
//       field: 'edit',
//       headerName: 'Edit',
//       width: 200,
//       disableClickEventBubbling:true,
//       renderCell: (params) => {
//         return (
//           <div>
//             <MatEdit index={params.row._id}/>
//           </div>
//         );
//       }
//     },
//     {
//       field: 'name',
//       headerName: 'First name',
//       width: 200,
  
//     },
//     {
//       field: 'email',
//       headerName: 'E-mail',
//       width: 300,
  
//     },
//     {
//       field: 'isPending',
//       headerName: 'Status(verified or not)',
//       width: 300,
  
//     },
//   ];

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       {isLoading && <CircularProgress color="success" />}
//       {data && <DataTable
//         rows={data}
//         columns={columns}
        
//       />}
//     </div>
//   );











  // const {data, isLoading, error} = useFetch(base_url + '/admin/teachers');
  // console.log(data);

 

  // return (
  //   <Box
  //     display='flex'
  //     flexDirection='column'
  //     sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
  //   >
  //     <Typography sx={{fontFamily:"Times New Roman" , fontSize:15,}}>
  //       {'On ' + new Date().toDateString()}
  //     </Typography>
  //     {data && <TableContainer sx={{  mt: 1,}} >
  //       <Table sx={{ maxWidth: '85vw' }} size="small" aria-label="a dense table" stickyHeader>
  //           <TableHead>
  //           <TableRow>
  //               <TableCell  sx={{fontSize:20}}>Id</TableCell>
  //               <TableCell align="right" sx={{fontSize:20}}>name</TableCell>
  //               <TableCell align="right" sx={{fontSize:20}}>Email</TableCell>
  //               <TableCell align="right" sx={{fontSize:20}}>Phone</TableCell>
  //               <TableCell align="right" sx={{fontSize:20}}>Address</TableCell>
  //               <TableCell align="right" sx={{fontSize:20}}>Carbs&nbsp;(g)</TableCell>
  //               <TableCell align="right" sx={{fontSize:20}}>Protein&nbsp;(g)</TableCell>
  //           </TableRow>
  //           </TableHead>
  //           <TableBody>
  //           {data.map((row) => (
  //               <TableRow
  //               key={row.name}
  //               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  //               >
  //               <TableCell component="th" scope="row">
  //                   {row._id}
  //               </TableCell>
  //               <TableCell align="right">{row.name}</TableCell>
  //               <TableCell align="right">{row.email}</TableCell>
  //               <TableCell align="right">{row.phone}</TableCell>
  //               <TableCell align="right">{row.address}</TableCell>
  //               </TableRow>
  //           ))}
  //           </TableBody>
  //       </Table>
  //     </TableContainer>}
  //   </Box>

  //   <div style={{ height: 400, width: '100%' }}>
  //     <DataTable
  //       rows={users}
  //       columns={columns}
  //     />
  //   </div>
  // );
//};

// export default TeacherTable;





