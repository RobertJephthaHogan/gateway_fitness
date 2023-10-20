import React from "react";
import './styles.css'
import { useNavigate } from "react-router-dom";


export default function LayoutHeader() {

    const navigate = useNavigate()

    return (
        <div className="layout-header">
            <div className='layout-header-left layout-header-cell'>
                <div 
                    className='layout-header-left-wrapper'
                    onClick={() => navigate('/')}
                >
                    <span className='header-left-title-text'>
                        <span className='header-left-title-bold'>
                            Gateway
                        </span>
                        <span className='header-left-title-light'>
                            Fitness
                        </span>
                    </span>
                    <span className='header-left-subtitle-text'>
                        The Gateway to a Healthier life
                    </span>
                </div>
            </div>
            <div className='layout-header-center layout-header-cell'>

            </div>
            <div className='layout-header-right layout-header-cell'>
                Hp header right
            </div>

        </div>
    )
}