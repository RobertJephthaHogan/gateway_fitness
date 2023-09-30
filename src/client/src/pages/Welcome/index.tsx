import React from "react";
import './styles.css'


export default function Welcome() {

    return (
        <div className="welcome-page">
            <div className="welcome-page-content">
                <div className="welcome-pg-success-text">
                    Success!
                </div>
                <div className="welcome-pg-welcome-text">
                    Welcome To Gateway Fitness.
                </div>
                <div className="welcome-pg-journey-text">
                    Your Journey Has Started.
                </div>
            </div>
        </div>
    )
}