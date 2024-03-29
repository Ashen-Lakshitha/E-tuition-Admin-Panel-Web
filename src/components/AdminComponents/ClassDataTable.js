import * as React from 'react';
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



export default function ClassDataTable({data}) {
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
        sx={{ mt: 2, width:'100%',justifyContent:'center'}}  
     >
        <Typography sx={{fontSize:15,fontWeight: 600}}>
                {'Today - ' + new Date().toDateString()}
        </Typography>
        {data &&<TableContainer sx={{  mt: 1}} component={Paper}>
          <Table  size="small" aria-label="customized table">
            <TableHead sx={{backgroundColor: "#3F51B5"}}>
              <TableRow Color= "white">
                <StyledTableCell align="center"><Typography color= "white">Post</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Stream</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Subject</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Teacher</Typography></StyledTableCell>
                <StyledTableCell align="center"><Typography color= "white">Fee</Typography></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
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
                    <Avatar alt="John Doe" variant="rounded" src={row.post.webContentLink} />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.stream}</StyledTableCell>
                  <StyledTableCell align="center">{row.subject}</StyledTableCell>
                  <StyledTableCell align="center">{row.teacher.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.fee}</StyledTableCell>
                  <StyledTableCell align="center">
                  <Box
                    sx={{justifyContent:'right', mt:0}}
                  >
                    <Button variant="contained" onClick={()=>{
                      navigate("/admin/classdetails/"+row._id)
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