import { useNavigate, useParams } from 'react-router-dom';

import { Box } from '@mui/system';
import { Typography, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useFetch from '../../services/useFetch';
import { base_url } from '../../Const/Const';

const QuizList = () => {

    const navigate = useNavigate();
    const {subjectid} = useParams();
    const {data, isLoading, error} = useFetch(base_url + '/subjects/' + subjectid + '/quiz');
    return (
        <Box 
            display='flex'
            flexDirection='column'
            sx={{ mt: 8, pl:2,pr:2, width:'100%'}}  
        >
             <Box
               marginTop = {2}
               marginBottom = {2}
               display='flex'
               flexWrap="wrap"
               paddingLeft={2}
               paddingTop={1}
               paddingBottom={1}
            >
                <Typography
                    sx={{fontSize:30,mb:1,mt:1,color:"#3F51B5",fontWeight: 600}}
                >
                    Quiz List
                </Typography>
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                flexDirection='row'
                sx={{justifyContent:'right'}}
            >
                <Button variant="contained" startIcon={<AddIcon />} onClick={()=>{navigate("/teacher/subjects/" + subjectid + "/createquiz");}}
                sx={{backgroundColor:"#3F51B5",color:"white"}}>
                    Create Quiz
                </Button>          
            </Box>
            <Box
                display='flex'
                flexWrap="wrap"
                sx={{justifyContent:'center'}}
            >
                {error && <div>{error}</div>}
                {isLoading && <CircularProgress color="primary" />}
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                sx={{width: '100%', mt:2}}
            >
                {data && data.map((item) => (
                    <div key={item._id}>
                        <Box sx={{backgroundColor:'#c6cbec', mb:2, pl:1, pr:1,borderRadius: 2}}>
                        <Typography variant='body2'>
                                Created At : {item.createdAt.substring(0,10)}
                            </Typography>
                            <Typography variant='h6'>
                                Title : {item.title}
                            </Typography>
                            <Typography>
                                Duration : {item.duration} mins
                            </Typography>
                            <Button 
                                size='small'
                                variant="contained"
                                sx={{mb:1,backgroundColor:"#3F51B5",color:"white"}}
                                onClick={()=>{navigate("/teacher/quiz/" + item._id);}}
                            >
                                Update
                            </Button>
                        </Box>
                    </div>
                ))}
            </Box>
        </Box>
    );
}
 
export default QuizList;