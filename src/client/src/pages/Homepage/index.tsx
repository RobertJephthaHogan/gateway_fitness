import { Button } from "antd";
import HomepageHeader from "../../components/HomepageHeader";
import './styles.css'
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";


export function Homepage() {

    const navigate = useNavigate();

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
                            onClick={() => navigate('/services')}
                        >
                            See Our Services
                        </Button>
                    </div>
                </div>
                <div className="wwd-right">
                    
                </div>
            </div>
            <div className="platform-section">
                platform
            </div>
            <Footer/>
        </div>
    )
}