import { Button } from "antd";
import HomepageHeader from "../../components/HomepageHeader";
import './styles.css'
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";


export function Homepage() {

    const navigate = useNavigate();

    function goToAndScrollToTop(path: string) {
        navigate(path)
        window.scrollTo(0, 0)
    }

    return (
        <div>
            <HomepageHeader/>
            <div className="hp-landing">
                <div className="hp-landing-content">
                    <span className="landing-title">
                        Ready to get started?
                    </span>
                    <span className="landing-subtitle">
                        Time to get fit
                    </span>
                    <div className="landing-btn-row">
                        <Button
                            className="hp-btn"
                            onClick={() => navigate('/signup')}
                        >
                            Get Started
                        </Button>
                        <Button
                            className="hp-btn"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
            <div className="what-we-do-section">
                <div className="wwd-left">
                    <span className="wwd-title">What We Do</span>
                    <span className="wwd-large">Take Your Health And Physique <br/>To The Next Level</span>
                    <span className="wwd-sub">We provide online tools and services to help you obtain your dream physique. </span>
                    <div className="wwd-left-btm-row">
                        <div className="wwd-left-btm-text-container txt-center">
                            <span className="wwd-left-btm-text">Workout Planning <br/> & Tracking</span>
                        </div>
                        <div className="wwd-left-btm-text-container txt-center">
                            <span className="wwd-left-btm-text">Nutrition Planning <br/> & Tracking</span>
                        </div>
                        <div className="wwd-left-btm-text-container txt-center">
                            <span className="wwd-left-btm-text">Goal Oriented <br/>Workout  & Nutrition <br/>Plans</span>
                        </div>
                    </div>
                    <div className="wwd-btn-row">
                        <Button
                            className="hp-btn"
                            onClick={() => goToAndScrollToTop('/services')}
                        >
                            See Our Services
                        </Button>
                    </div>
                </div>
                <div className="wwd-right">
                    
                </div>
            </div>
            <div className="about-section">
                <div className="about-section-content">
                    <div className="about-us-title-container">
                        <span className="about-us-title">
                            About Us
                        </span>
                    </div>
                    <div className="about-us-large-text-container">
                        <span className="about-us-large-text">
                            We Believe Fitness Is The Gateway <br/> To An Awesome Life.
                        </span>
                    </div>
                    <div className="about-us-description-container">
                        <span className="about-us-description">
                        Here at Gateway Fitness we believe that fitness is the gateway to an awesome life. We provide online tools to help 
                        <br/> you easily track your workouts and nutrition, tailored workout and nutrition plans based on your goals, and 
                        <br/> supplements to help you speed up your progress.
                        </span>
                    </div>
                    <div className="about-us-approach-container">
                        <span className="about-us-approach">
                            Our Approach:
                        </span>
                    </div>
                    <div className="about-us-approach-steps-container">
                        <div className="approach-step-text-container">
                            <span className="approach-step-text">
                                1. Provide A Platform
                            </span>
                        </div>
                        <div className="approach-step-text-container">
                            <span className="approach-step-text">
                                2. Make it Customizable
                            </span>
                        </div>
                        <div className="approach-step-text-container">
                            <span className="approach-step-text">
                                3. Provide Online Trainers
                            </span>
                        </div>
                    </div>
                    <div className="about-us-btn-row">
                        <Button
                            className="hp-btn"
                            onClick={() => goToAndScrollToTop('/about')}
                        >
                            See More About Us
                        </Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}