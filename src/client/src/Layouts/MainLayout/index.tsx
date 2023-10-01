import React from "react";
import './styles.css'
import SideBar from "./SideBar";
import LayoutHeader from "./Header";
import { Outlet } from "react-router-dom";


export default function() {

    return (
        <div className="main-layout">
            <SideBar/>
            <div className="layout-body">
                <LayoutHeader/>
                <Outlet/>
            </div>
        </div>
    )
}