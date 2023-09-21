import React from 'react'
import './styles.css'


export default function Footer() {

    return (
        <div className='footer-component'>
            <div className='footer-content'>
                <div className='footer-left'>
                    <div>
                        <span className='footer-title-text-bold'>Gateway</span>
                        <span className='footer-title-text-light'>Fitness</span>
                    </div>
                    <span className='footer-subtitle-text'>The Gateway To A Healthier Life</span>
                </div>
                <div className='footer-center-left'>
                    <div>
                        <div>
                            <span className='footer-text'>
                                Contact Us
                            </span>
                        </div>
                        <div>
                            <span className='footer-text'>
                                About Us
                            </span>
                        </div>
                    </div>
                </div>
                <div className='footer-center-right'>
                    <div>
                        <span className='footer-text'>
                            Privacy Policy
                        </span>
                    </div>
                </div>
                <div className='footer-right'>
                    <div>
                        <span className='follow-us-text'>
                            Follow Us
                        </span>
                    </div>
                    <div>
                        <div>
                            fb
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}