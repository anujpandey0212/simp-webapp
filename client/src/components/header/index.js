import { AppBar, Icon, Toolbar } from "@material-ui/core";
import image1 from "../../assets/simphy-logo.png";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EditIcon from '@mui/icons-material/Edit';
import TerminalIcon from '@mui/icons-material/Terminal';
import HomeIcon from '@mui/icons-material/Home';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Divider } from "@material-ui/core";
import user1 from "../../assets/user2.png";

export default function Header() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [data,setData]=React.useState(null);
  const [datam,setDatam]=React.useState(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  React.useEffect(()=>{
    fetch("/category")
      .then((res)=>res.json())
      .then((data) => {setData(data[0].tags)
        setDatam(data[0].tagsm)
      })
  },[user])

  function login() {
    // navigate('/signin');
    loginWithRedirect();
  }

  function ragister() {
    logout({ returnTo: window.location.origin });
    // navigate("/ragister");
  }

  const username=()=>{
    if(isAuthenticated){
      return(
        <p>Hello {user.name}</p>
      )
    }
    else{
      return(
        <p>Hello User</p>
      )
    }
  }

  const userimage=()=>{
    if(isAuthenticated){
      return(
        <img src={user.picture} height={80} id="userimage"></img>
      )
    }
    else{
      return(
        <img src={user1} height={80} id="userimage"></img>
      )
    }
  }

  function what_to() {
    
    if (isAuthenticated) {
      return (
        <Button onClick={ragister} id="buttonbhai">
          Logout
        </Button>
      );
    } else {
      return (
        <Button 
        onClick={login}
        id="buttonbhai"
        >
          Login
        </Button>
      );
    }
  }

  const displayDesktop = () => {
    return (
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            setState({ ...state, ["left"]: true });
          }}
        >
          <MenuIcon />
        </IconButton>
        <img src={image1} className="image1"></img>
        {/* <React.View style={{marginLeft:100}}> */}

        {what_to()}

        {/* </React.View> */}
      </Toolbar>
    );
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
    {/* //----------------------------------list starts--------------------------------------------- */}
      <List>
        <div id="userbox">
          {userimage()}
          {username()}
        </div>
        <Divider id="divider"/>
    {/* //----------------------------------home---------------------------------------------------- */}
        <ListItem
          button
          key={"Home"}
          onClick={()=>{
            toggleDrawer("left", false)
            navigate("/")
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
    {/* //--------------------------------add simulation--------------------------------------------- */}
        <ListItem
          button
          key={"addsimulation"}
          onClick={() => {
            toggleDrawer("left", false);
            navigate("/editor");
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={"Add Simulation"} />
        </ListItem>
    {/* //------------------------------------------physics------------------------------------------------ */}
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="Physics" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
      {/* //---------------------------------------topics in physics------------------------------------- */}
          <List component="div" disablePadding onClick={toggleDrawer(anchor, false)}>
            {data?.map((data)=>(
              <ListItemButton sx={{ pl: 4 }} onClick={()=>{navigate("/result",{state:{name:data}})}}>
              <ListItemIcon>
                <TerminalIcon />
              </ListItemIcon>
              <ListItemText primary={data}/>
            </ListItemButton>
            ))}
          </List>
        </Collapse>
    {/* //---------------------------------------------list ends--------------------------------------------- */}
    {/* //------------------------------------------Maths------------------------------------------------ */}
    <ListItemButton onClick={handleClick1}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="Maths" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
      {/* //---------------------------------------topics in Maths------------------------------------- */}
          <List component="div" disablePadding onClick={toggleDrawer(anchor, false)}>
          {datam?.map((data)=>(
              <ListItemButton sx={{ pl: 4 }} onClick={()=>{navigate("/result",{state:{name:data}})}}>
              <ListItemIcon>
                <TerminalIcon />
              </ListItemIcon>
              <ListItemText primary={data}/>
            </ListItemButton>
            ))}
          </List>
        </Collapse>
    {/* //---------------------------------------------list ends--------------------------------------------- */}
      </List>
    </Box>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <header>
      <AppBar 
      position="relative" 
      color="white" 
       >
        {displayDesktop()}
      </AppBar>
      <React.Fragment key={"left"}>
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
