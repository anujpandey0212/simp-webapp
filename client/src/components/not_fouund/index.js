import React from "react";
import "./notfound.css";
import {useNavigate} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import image from "../../assets/usernotfound.png"
import { Button } from "@material-ui/core";
import { useEffect } from "react";

export default function Notfound(){

    let navigate=useNavigate();
    const {user,isAuthenticated}=useAuth0();
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();

    function handelclick(event){
          // navigate("/signin")
            loginWithRedirect();     
    }

    useEffect(()=>{
        var division=document.getElementById("division1");
        division.style.display="block";
    })
    
    
    return(
        <div>
            <img src={image} id="illustrator"></img>
            {/* <a href='https://www.freepik.com/vectors/box'>Box vector created by stories - www.freepik.com</a> */}
            <p className="para">login in order to see the simulation</p>
            <Button className="button1" variant="contained" onClick={handelclick}>login</Button>
        </div>
    )
}