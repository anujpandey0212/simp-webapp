import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {  SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import {  FaGem,FaHeart} from "react-icons/fa";
import 'react-pro-sidebar/dist/css/styles.css';
import "./sidebar.css";

export default function SSidebar(){

    return (
        <div className="sidebar">
            <ProSidebar>
  <Menu iconShape="square">
    <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
    <SubMenu title="Components" icon={<FaHeart />}>
      <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem>
    </SubMenu>
  </Menu>
  <SidebarFooter icon={<FaHeart/>}>
    github
  </SidebarFooter>
</ProSidebar>;
        </div>
    )

}