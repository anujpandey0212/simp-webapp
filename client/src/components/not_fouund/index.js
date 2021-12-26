import React from "react";
import "./notfound.css";
import {useNavigate} from "react-router-dom";

export default function Notfound(){

    let navigate=useNavigate();

    function handelclick(event){
        if(event.target.id=="login_button"){
            navigate("/signin")
        }
        else if(event.target.id=="ragister_button"){
            navigate("/ragister")
        }
    }
    return(
        <div>
            <h1>User not found </h1>
            <button type="button" class="btn btn-primary" id="login_button" onClick={handelclick}>log in</button>
            <h1>or if not ragistered</h1>
            <button type="button" class="btn btn-primary" id="ragister_button" onClick={handelclick}>ragistered</button>
        </div>
    )
}