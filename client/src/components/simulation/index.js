import React from "react";
import { useLocation } from "react-router-dom";
import "./simulation.css";

export default function Simulation(){
    const location = useLocation();
    console.log(location.state.link)
    React.useEffect(()=>{
        var iframe=document.getElementById('iframe1');
        iframe.setAttribute('src',location.state.link)
    },[useLocation])
    return (
        <iframe src={location.state.src} className="iframe1" id="iframe1"></iframe>
    )
}