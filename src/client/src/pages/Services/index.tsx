import React from 'react'
import HomepageHeader from '../../components/HomepageHeader'
import './styles.css'



export default function Services() {

    return (
        <div className='services-component'>
            <HomepageHeader/>
            <div className='services-component-content-wrapper'>
                <div className='services-component-content'>

                    <div className='top-banner-wrapper'>
                        <div className='top-banner'>
                            <div className='services-title-wrapper'>
                                <span className='services-title'>
                                    Our Services
                                </span>
                            </div>
                            <div className='services-description-wrapper'>
                                <span className='services-us-description'>
                                    We provide services to help you with all aspects of your fitness journey. 
                                    We provide planning and tracking tools for your workouts and nutrition, 
                                    tailored workout and nutrition plans based on your goals, and online personal 
                                    training for when you need some extra guidance. 
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='service-tier-section'>
                        <div className='tiers-space'></div>

                        <div>
                            <span className='tiers-title'>
                                Tiers
                            </span>
                        </div>
                        <div className='tiers-space'></div>

                        <div className='tier-row'>
                            <div className='tier-card'>
                                <div className='tier-card-left'>
                                    <div className='tier-title-container'>
                                        <span className='tier-title'>
                                            Free Tier
                                        </span>
                                    </div>
                                    <div className='tier-subtitle-container'>
                                        <span className='tier-subtitle'>
                                            Basic Access
                                        </span>
                                    </div>
                                    <div className='tier-price-container'>
                                        <div className='tier-price-main'>
                                            $0
                                        </div>
                                        <div className='tier-price-additionals'>
                                            <div>
                                                <span className='tier-price-cents'>.00</span>
                                            </div>
                                            <div className='tier-price-monthly-container'>
                                                <span className='tier-price-monthly'>monthly</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='tier-card-right'>
                                    <div className='tier-card-right-top'>
                                        <div className='tier-card-right-title-container'>
                                            <span className='tier-card-right-title'>
                                                Free Tier Includes Access To:
                                            </span>
                                        </div>
                                        <div className='tier-card-right-list-container'>
                                            <ul className='tier-card-right-list'>
                                                <li>Our total fitness overview dashboard</li>
                                                <li>Our workout tracking dashboard</li>
                                                <li>Our nutrition tracking dashboard</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='tier-card-right-bottom'>
                                        <div className='tier-card-right-description-container'>
                                            <span className='tier-card-right-description'>
                                                Our Free Tier is perfect for any casual gym goer that wants to 
                                                start dialing in on their training and nutrition. Complete with 
                                                all the tools you need to stay on top of your training and nutrition.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='tier-row'>
                            <div className='tier-card'>
                                <div className='tier-card-left'>
                                    <div className='tier-title-container'>
                                        <span className='tier-title'>
                                            Premium Tier
                                        </span>
                                    </div>
                                    <div className='tier-subtitle-container'>
                                        <span className='tier-subtitle'>
                                            Premium Access
                                        </span>
                                    </div>
                                    <div className='tier-price-container'>
                                        <div className='tier-price-main'>
                                            $49
                                        </div>
                                        <div className='tier-price-additionals'>
                                            <div>
                                                <span className='tier-price-cents'>.99</span>
                                            </div>
                                            <div className='tier-price-monthly-container'>
                                                <span className='tier-price-monthly'>monthly</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='tier-card-right'>
                                    <div className="tier-card-right-top">
                                        <div className='tier-card-right-title-container'>
                                            <span className='tier-card-right-title'>
                                                Premium Tier Includes Access To:
                                            </span>
                                        </div>
                                        <div className='tier-card-right-list-container'>
                                            <ul className='tier-card-right-list'>
                                                <li>All of the features from our Free Tier</li>
                                                <li>Access to our workout split customization tool</li>
                                                <li>Access to our goal based workout plans</li>
                                                <li>Access to our goal based nutrition plans</li>
                                                <li>Easy-plan feature to swap out your scheduled plans with just a few clicks</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tier-card-right-bottom">
                                        <div className='tier-card-right-description-container'>
                                            <span className='tier-card-right-description'>
                                                Our Premium Tier is perfect for anyone who takes their training and health seriously, 
                                                and wants to take it to the next level. Complete with all the tools you need quickly 
                                                customize your routines, upload templates for muscle building or fat loss, and more.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='tier-row'>
                            <div className='tier-card'>
                                <div className='tier-card-left'>
                                    <div className='tier-title-container'>
                                        <span className='tier-title'>
                                            Elite Tier
                                        </span>
                                    </div>
                                    <div className='tier-subtitle-container'>
                                        <span className='tier-subtitle'>
                                            Complete Access
                                        </span>
                                    </div>
                                    <div className='tier-price-container'>
                                        <div className='tier-price-main'>
                                            $79
                                        </div>
                                        <div className='tier-price-additionals'>
                                            <div>
                                                <span className='tier-price-cents'>.99</span>
                                            </div>
                                            <div className='tier-price-monthly-container'>
                                                <span className='tier-price-monthly'>monthly</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='tier-card-right'>
                                    <div className="tier-card-right-top">
                                        <div className='tier-card-right-title-container'>
                                            <span className='tier-card-right-title'>
                                                Elite Tier Includes Access To:
                                            </span>
                                        </div>
                                        <div className='tier-card-right-list-container'>
                                            <ul className='tier-card-right-list'>
                                                <li>All of the features from our Premium Tier</li>
                                                <li>Access to our mobile platform</li>
                                                <li>Access to our automated workout tracking</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tier-card-right-bottom">
                                        <div className='tier-card-right-description-container'>
                                            <span className='tier-card-right-description'>
                                                Our Elite Tier is perfect for anyone who takes their training and health seriously, 
                                                and values the ergonomics of our desktop platform, in addition to the the easy of 
                                                real time workout tracking via our mobile platform.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='tiers-space-btm'>

                        </div>

                    </div>


                </div>
            </div>            
        </div>
    )
}