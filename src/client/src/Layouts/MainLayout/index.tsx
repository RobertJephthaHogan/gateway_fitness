import React from "react";
import './styles.css'
import SideBar from "./SideBar";
import LayoutHeader from "./Header";
import { Outlet } from "react-router-dom";


export default function() {

    return (
        <div>
            <SideBar/>
            <div>
                <LayoutHeader/>
                <Outlet/>
            </div>
        </div>
    )
}