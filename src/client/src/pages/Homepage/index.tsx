import { Button } from "antd";
import HomepageHeader from "../../components/HomepageHeader";
import './styles.css'


export function Homepage() {
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
                        >
                            Get Started
                        </Button>
                        <Button
                            className="hp-btn"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}