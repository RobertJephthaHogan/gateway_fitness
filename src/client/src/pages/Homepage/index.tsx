import { Button } from "antd";
import HomepageHeader from "../../components/HomepageHeader";
import './styles.css'
import { useNavigate } from "react-router-dom";


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
        </div>
    )
}