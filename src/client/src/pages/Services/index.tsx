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
                        <div>
                            <span className='tiers-title'>
                                Tiers
                            </span>
                        </div>
                    </div>

                    Services Page


                </div>
            </div>            
        </div>
    )
}