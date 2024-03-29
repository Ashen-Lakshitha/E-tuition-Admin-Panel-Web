import { useState } from 'react';
import React, { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    Drawer,
    Typography,
    ListItemIcon,
    ListItemButton,
    List,
    Toolbar, 
    useTheme, 
    useMediaQuery } from '@mui/material/styles';
import { makeStyles }from '@mui/styles';

const useStyles = makeStyles({
    root: {
        "&$selected": {
          backgroundColor: "white",
          width:200,
          color: "#3F51B5",
          borderTopLeftRadius:10,
          borderBottomLeftRadius:10,
          "&:hover": {
            backgroundColor: "white"
          }
        },
        "&:hover": {
            backgroundColor: "white",
            transform: "scale3d(1.1, 1.1, 1)",
            transition: "0.5s"
          }
    },
    selected: {},
    drawer:{
      width:"200px"
    }
})

export default function AdminDrawer({open}) {

    const styles = useStyles();
    const theme = useTheme();
     const navigate = useNavigate();
    const isMdUp = useMediaQuery(theme.breakpoints.up("sm"));
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const drawerWidth = 200;

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <Drawer
            variant={isMdUp ? "permanent" : "temporary"}
            anchor="left"
            open={open}
            sx={{width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  borderRight:'none',
                  boxSizing: 'border-box',
                },
            }}
        >
        <Toolbar />
            <Box>
                <List 
                    sx={{color:"black"}}
                >
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => {handleListItemClick(0);
                        navigate("/admin/home")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <HomeRoundedIcon sx={{color:'#000000'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Home</Typography>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => {handleListItemClick(1);
                         navigate("/admin/all-classes")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <SchoolRoundedIcon sx={{color:'#000000'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>All Classes</Typography>

                    </ListItemButton>

                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => {handleListItemClick(2);
                        navigate("/admin/all-teachers")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <BoyRoundedIcon sx={{color:'#000000'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Teachers</Typography>
                    </ListItemButton>

                    <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => {handleListItemClick(3);
                        navigate("/admin/all-students")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <EscalatorWarningRoundedIcon sx={{color:'#000000'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Students</Typography>
                    </ListItemButton>

                    <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={(event) => {handleListItemClick(4);
                        navigate("/admin/complains")}}
                        classes={{
                            root: styles.root,
                            selected: styles.selected
                        }}
                    >
                        <ListItemIcon>
                            <NotificationsIcon sx={{color:'#000000'}}/>
                        </ListItemIcon>
                        <Typography sx={{fontWeight: 600}}>Complains</Typography>
                    </ListItemButton>


                </List>
            </Box>
        </Drawer>
    );
}