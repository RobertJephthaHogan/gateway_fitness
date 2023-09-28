import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';


export default function Footer() {

    const navigate = useNavigate()

    const handleNavigate = (destination: string) => {
        window.scrollTo(0, 0);
        navigate(destination);
    };

    return (
        <div className='footer-component'>
            <div className='footer-content'>
                <div className='footer-left' onClick={() => handleNavigate('/')}>
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
                    <div className='icon-row'>
                        <FacebookOutlined className='footer-icon'/>
                        <TwitterOutlined className='footer-icon'/>
                        <YoutubeOutlined className='footer-icon'/>
                        <InstagramOutlined className='footer-icon'/>
                    </div>
                </div>
            </div>
        </div>
    )
}