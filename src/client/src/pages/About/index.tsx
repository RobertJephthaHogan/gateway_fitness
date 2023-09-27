import React from 'react'
import HomepageHeader from '../../components/HomepageHeader'
import './styles.css'



export default function About() {

    return (
        <div className='about-component'>
            <HomepageHeader/>
            <div className='about-component-content-wrapper'>
                <div className='about-component-content'>

                    <div className='top-banner-wrapper'>
                        <div className='top-banner'>
                            <div className='about-title-wrapper'>
                                <span className='about-title'>
                                    About Us
                                </span>
                            </div>
                            <div className='about-description-wrapper'>
                                <span className='about-us-description'>
                                    Here at Gateway Fitness we believe that fitness is the gateway to an awesome life.  
                                    We provide online tools to help you easily track your workouts and nutrition, 
                                    tailored workout and nutrition plans based on your goals, 
                                    and supplements to help you speed up your progress.
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='our-approach-section'>
                        <div>
                            <span className='our-approach-title'>
                                Our Approach
                            </span>
                        </div>
                        <div className='appr-space'>

                        </div>
                        <div className='approach-row'>
                            <div className='approach-row-text-left'>
                                <div className='approach-row-top-text-container'>
                                    <span className='approach-row-top-text'>
                                        1. Provide A Platform
                                    </span>
                                </div>
                                <div className='approach-row-mid-text-container'>
                                    <span className='approach-row-mid-text'>
                                        Provide a platform with high-tech tracking tools for nutrition and workouts
                                    </span>
                                </div>
                                <div  className='approach-row-bottom-text-container'>
                                    <span className='approach-row-bottom-text'>
                                        We’ve created a high-tech fitness platform with ergonomic tools for planning and tracking your workouts and your nutrition. We provide a free “self-managed” tier, in addition to our premium tiers that include our tailored features and templates.
                                    </span>
                                </div>
                            </div>
                            <div className='approach-row-image-right'>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}