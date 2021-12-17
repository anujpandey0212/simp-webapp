
import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
import image1 from "../../assets/simphy-logo.png"

import "./header.css"

export default function Header() {
  const displayDesktop = () => {
    return <Toolbar><img src={image1} className="image1"></img></Toolbar>;
  };
  
  return (
    <header >
      <AppBar position="relative">{displayDesktop()}</AppBar>
    </header>
  );
}