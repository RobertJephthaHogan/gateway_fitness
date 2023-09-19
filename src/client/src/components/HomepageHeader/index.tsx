import React from 'react'
import './styles.css'


export default function HomepageHeader() {

    return (
        <div className='hp-header'>
            <div className='hp-header-left hp-header-cell'>
                <div className='hp-header-left-wrapper'>
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
            <div className='hp-header-center hp-header-cell'>
                <div className='hp-header-center-cell'>
                    <span className='hp-header-center-text'>
                        Home
                    </span>
                </div>
                <div className='hp-header-center-cell'>
                    <span className='hp-header-center-text'>
                        About
                    </span>
                </div>
                <div className='hp-header-center-cell'>
                    <span className='hp-header-center-text'>
                        Services
                    </span>
                </div>
                <div className='hp-header-center-cell'>
                    <span className='hp-header-center-text'>
                        Products
                    </span>
                </div>
            </div>
            <div className='hp-header-right hp-header-cell'>
                Hp header right
            </div>
        </div>

    )
}