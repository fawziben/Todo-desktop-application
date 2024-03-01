import React from 'react'
import { AppBar, Box, Container, Drawer, InputBase, List, ListItem, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useLocation, useNavigate } from 'react-router-dom';
import {format} from 'date-fns'
import Avatar from '@mui/material/Avatar';
import myimg from './avatar.jpg'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { blue, grey } from '@mui/material/colors';



const drawerWidth = 240

const classes = {
    drawer : {
    width: drawerWidth,
    '& .MuiDrawer-paper': {backgroundColor : '#f4f4f4', width: drawerWidth, }
    },    
    root : {
        display : 'flex'
  },
    clickedItem:{
        background: grey [400],
    },
    toolbar : {
        width : `calc(100% - ${drawerWidth}px)`,
    },
    date : {
        flexGrow: 1
    },
    toolbarheight:{ 
        marginTop: '70px'
    },
    avatar : {
        marginLeft : '10px'      
    },
    drawerHeader : {
        display : 'flex',
        marginTop : '10px',
        paddingRight : '10px',
        paddingLeft : '10px',

    },
    searchBar : (path) => {
        const all = {
            display : 'flex',
        }
          if (path === '/add')  { all.display =  'none'};
          return all;    }
  }

const items = [
    {
        text: 'Main Page',
        icon : <HomeIcon color='primary'/>,
        path : '/'
    },
    {
        text: 'Secondary Page',
        icon : <AddCircleOutlineIcon color='primary'/>,
        path : '/add'
    },
]

export default function Layout({children}) {

    const changeWindow = (item) => {  
        classes.searchBar.display = item.path === '/' ? 'flex' : 'none' 
        navigate(item.path)
    }
    
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <Box sx={classes.root}>
        <AppBar color='secondary' position='fixed' sx={classes.toolbar} elevation={0}>
            <Toolbar>
            <Box sx={classes.searchBar(location.pathname)} >
                <Container>
                    <SearchIcon />
                </Container>
                <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
           </Box>
           <Box sx={{flexGrow : 1}}></Box>
                {/* <Typography variant='h6' sx={classes.date}>
                    {format(new Date(),'do MMMM Y')}
                </Typography> */}
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer 
            sx={classes.drawer}
            variant='persistent' 
            anchor='left' 
            open
        >
            <Box sx={classes.drawerHeader}>
                <Typography variant='h6' sx={{flexGrow : 1}} noWrap>
                    Benmoumen Fawzi
                </Typography>
                <Avatar
                    src={myimg}
                />
            </Box>
            <List>
                {items.map(item => (
                    <ListItem 
                    key={item.text} 
                    // button onClick={()=>navigate(item.path)}
                    button onClick={()=>changeWindow(item)}
                    sx={location.pathname == item.path ? classes.clickedItem : null}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.text}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </Drawer>
        {/* Le composant Container prend toute la largeur de l'ecran contrairement au composant Box */}
        <Container sx={classes.toolbarheight}>
            {children}
        </Container>
    </Box>
  )
}
