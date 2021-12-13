import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu ,image} from 'react-pro-sidebar';
import {  SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import {  FaGem,FaHeart} from "react-icons/fa";
import 'react-pro-sidebar/dist/css/styles.css';
import "./sidebar.css";
import image1 from "../../assets/simphy-logo.png"
import Hamburger from 'hamburger-react'
import { useState } from 'react';

export default function SSidebar(){
     const [isOpen, setOpen] = useState(true);



    return (
        <div className="sidebar">
            <ProSidebar collapsed={isOpen} collapsedWidth={70}>
                <SidebarHeader className="header1">
                    <Hamburger onToggle={toggled => {
                            if (toggled) {
                                setOpen(false);
                            } else {
                                setOpen(true);
                            }
                            }} />
                            {/* <img src="image1" className="image1"></img> */}
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                        <SubMenu title="Components" icon={<FaHeart />}>
                            <MenuItem>Component 1</MenuItem>
                            <MenuItem>Component 2</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter icon={<FaHeart/>}>
                    github
                </SidebarFooter>
  
            </ProSidebar>
        </div>
    )

}