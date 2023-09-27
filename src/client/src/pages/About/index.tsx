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
                        <div className='appr-space'></div>
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
                                        We’ve created a high-tech fitness platform with ergonomic tools for planning and tracking your workouts and your nutrition. 
                                        We provide a free “self-managed” tier, in addition to our premium tiers that include our tailored features and templates.
                                    </span>
                                </div>
                            </div>
                            <div className='approach-row-image-right'>
                                
                            </div>
                        </div>
                        <div className='approach-row'>
                            <div className='approach-row-image-left'>
                                
                            </div>
                            <div className='approach-row-text-right'>
                                <div className='approach-row-text-right-container'>
                                    <div className='approach-row-top-text-container'>
                                        <span className='approach-row-top-text'>
                                            2. Make it Customizable
                                        </span>
                                    </div>
                                    <div className='approach-row-mid-text-container'>
                                        <span className='approach-row-mid-text'>
                                            Tailor our platform for your fitness goals
                                        </span>
                                    </div>
                                    <div  className='approach-row-bottom-text-container'>
                                        <span className='approach-row-bottom-text'>
                                            We understand that not everyone has the same fitness goals, and that your fitness goals may change over time. 
                                            Our premium tiers allow you to schedule entire nutrition and workout plans based on your goals at the click of a button. 
                                            If your goals change, you can re-generate your workout and nutrition plans quickly and easily.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='approach-row'>
                            <div className='approach-row-text-left'>
                                <div className='approach-row-text-left-container'>
                                    <div className='approach-row-top-text-container'>
                                        <span className='approach-row-top-text'>
                                            3.Provide online trainers
                                        </span>
                                    </div>
                                    <div className='approach-row-mid-text-container'>
                                        <span className='approach-row-mid-text'>
                                            We provide online personal trainers to help keep you on track
                                        </span>
                                    </div>
                                    <div  className='approach-row-bottom-text-container'>
                                        <span className='approach-row-bottom-text'>
                                            Getting started, or getting back on track with a fitness routine can be a challenge. 
                                            Our trainers can help you get on track easily and quickly, help you find an effective routine, 
                                            and ensure you understand proper form for all of your exercises.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='approach-row-image-right'>
                                
                            </div>
                        </div>
                    </div>

                    <div className='spce-btm'>

                    </div>

                </div>
            </div>
        </div>
    )
}