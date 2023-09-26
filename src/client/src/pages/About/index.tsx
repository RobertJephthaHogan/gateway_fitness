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

                </div>
            </div>
        </div>
    )
}