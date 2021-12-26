import { AppBar, Toolbar } from "@material-ui/core";
import image1 from "../../assets/simphy-logo.png"
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import "./header.css"

export default function Header() {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

const navigate=useNavigate();

function login(){
  navigate('/signin');
}

function ragister(){

}

  const displayDesktop = () => {
    return (<Toolbar>
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{setState({ ...state, ['left']: true })}}
          >
            <MenuIcon/>
          </IconButton>
      <img src={image1} className="image1"></img>
      {/* <React.View style={{marginLeft:100}}> */}
      <button onClick={login} style={{marginLeft:100}}>
  Login
</button> 
<button onClick={ragister} style={{marginLeft:120}}>
  Ragister
</button>
{/* </React.View> */}
    </Toolbar>
    )
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button key={"inbox"} onClick={()=>{navigate('/')}}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"inbox"} />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button key={"mail"} onClick={()=>{navigate('/editor')}}>
            <ListItemIcon>
            <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"mail"} />
          </ListItem>
      </List>
    </Box>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  return (
    <header >
      <AppBar position="relative" color="white">{displayDesktop()}</AppBar>
      <React.Fragment key={'left'}>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>
    </header>
  );
}
