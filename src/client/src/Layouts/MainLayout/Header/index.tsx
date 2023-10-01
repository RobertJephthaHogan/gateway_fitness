import React from "react";
import './styles.css'


export default function LayoutHeader() {

    return (
        <div className="layout-header">
            <div className="layout-header-left">
                <div>
                    <span className="lo-header-title-bold">Gateway</span>
                    <span  className="lo-header-title-light">Fitness</span>
                </div>
                <div>
                    <span className="lo-header-subtitle">
                        The Gateway To A Healthier Life
                    </span>
                </div>
            </div>
        </div>
    )
}