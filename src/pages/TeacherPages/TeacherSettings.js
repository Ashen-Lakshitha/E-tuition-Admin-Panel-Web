/*import React from 'react'

function Chat() {
  return (
    <div className="chat">Chat</div>
  );
}

 export default Chat;*/

 import { Box } from '@mui/system';
 import Typography from '@mui/material/Typography';
 import useFetch from '../../services/useFetch';
 import { useTheme } from '@mui/material/styles';
 import useMediaQuery from '@mui/material/useMediaQuery';
 import CircularProgress from '@mui/material/CircularProgress';
 
 import { useState } from 'react';
 import { makeStyles } from '@mui/styles';
 
 
 const TeacherSettings = () => {
 
     // const {data, isLoading, error} = useFetch('http://localhost:5000/subjects/myclasses/5d7a514b5d2c12c7449be041');
 
     const theme = useTheme();
     const match = useMediaQuery(theme.breakpoints.down("sm"));
     const [open, setOpen] = useState(false);
 
 
     
 
     return (  
         <Box
             display='flex'
             flexDirection='column'
             sx={{  mt: 8, pl:2,pr:2, width:'100%'}}
         >
              <Box
                marginTop = {2}
                marginBottom = {2}
                display='flex'
                flexWrap="wrap"
                paddingLeft={2}
                paddingTop={1}
                paddingBottom={1}
               //sx={{justifyContent:'center',backgroundColor:'#F2F2F2',border:1, borderColor:'#E0E0E0',borderRadius: 2}}
                
            >
            <Typography
             sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}} 
            >
              Settings
            </Typography>
            </Box>
         
             
         </Box>
     );
 }
 export default TeacherSettings;
  
 