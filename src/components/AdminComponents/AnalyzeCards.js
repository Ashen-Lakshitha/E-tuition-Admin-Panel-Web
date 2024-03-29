import * as React from 'react';

import { Box } from '@mui/system';
import { 
  Typography, 
  Avatar, 
  Card, 
  CardContent, 
  useTheme, 
  useMediaQuery } from '@mui/material';

export default function AnalyzeCard({data}) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box  sx={{ m:1}}>
      <Card sx={{width:match?350:350,height:match?170:170, display: 'flex', boxShadow: 12,borderRadius:2}}  >
      <Box sx={{ width:"100%",display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{justifyContent:'center', flex: '1 0 auto'}}>
          <Typography component="div" variant="h5"  sx={{fontSize:20,mb:1,mt:1,pl:5,pt:4,color:"#3F51B5"}}>
            {data.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{pl:9}} component="div">
            {data.count}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{p:0.5,width:"100%",display: 'flex', flexDirection: 'column'}}>
      <Avatar src={data.image} sx={{bgcolor: '#f2f2f2', width:160,height:160,border:1,borderColor:'#E0E0E0'}} />
      </Box>
    </Card>   
    </Box>    
  );
}



