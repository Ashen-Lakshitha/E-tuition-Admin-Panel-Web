import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Typography, Button } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box } from '@mui/system';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { base_url } from '../../Const/Const';
import useFetch from '../../services/useFetch';
import { useNavigate,useParams } from 'react-router-dom';


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



export default function TeacherTable() {
  const history = useNavigate();
  const {data, isLoading, error} = useFetch(base_url + '/admin/students');
  console.log(data);
  return (
      <Box 
        display='flex'
        flexDirection='column'
        sx={{ mt: 8, width:'100%'}}  
     >

        {data &&<TableContainer sx={{  mt: 1}} component={Paper}>
          <Table  size="small" aria-label="customized table">
            <TableHead sx={{backgroundColor: "black"}}>
              <TableRow Color= "white">
                <StyledTableCell align="center"><Typography color= "white">Name</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Email</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Verified</Typography></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.isPending.toString()}</StyledTableCell>
                  <StyledTableCell align="center">
                  <Box
                    sx={{justifyContent:'right', mt:1}}
                  >
                    <Button variant="none" onClick={()=>{
                      history.push("/studentdetails/"+row._id)
                    }}
                    sx={{backgroundColor:"#4b0082",color:"white"}}>
                        view
                    </Button>          
                  </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}     
      </Box>
  );
}


// import * as React from 'react';
// import DataTable from './DataTable';
// import { DataGrid } from '@mui/x-data-grid';
// import { useState, useEffect } from "react";
// import useFetch from '../../services/useFetch';
// import { base_url } from '../../Const/Const';
// import { forwardRef } from 'react';
// import Edit from '@mui/icons-material/Edit';
// import IconButton from '@mui/material/IconButton';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { useHistory,useParams } from 'react-router-dom';
// import CircularProgress from '@mui/material/CircularProgress';




// const StudentTable = () => {
//   const history = useHistory();
//   const { subjectid } = useParams();

//   const {data, isLoading, error} = useFetch(base_url + '/admin/students'); 
//   console.log(data);

//   const MatEdit = ({index}) =>{
//     const handleEditClick = () => {
      
//     }
  
//     return <FormControlLabel
//               control={
//                 <IconButton  onClick={()=>{
//                   history.push("/studentdetails/"+index);
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
// }

// export default StudentTable;
