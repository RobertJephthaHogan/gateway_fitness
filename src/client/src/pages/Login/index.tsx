import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userService } from "../../services"
import './styles.css'
import { Button, Input } from "antd"


export function Login() {

    const [loginInfo, setLoginInfo] = useState<any>({})
    const navigate = useNavigate()


    function handleLoginInfoChange(data: any, field: any) {
        let workingObj = {...loginInfo}
        workingObj[field] = data
        setLoginInfo(workingObj)     
    }

    
    function dispatchLoginData(resp: any) {
        console.log('resp', resp)
		//store.dispatch(userActions.login(resp))
    }


    function onSubmitLogin(e : any) {
        e.preventDefault()
        userService.loginUser(loginInfo).then((resp: any) => {
			dispatchLoginData(resp.data)
			navigate('/dashboard')
        })
    }


    return (
        <div className="login-component">
            <div className="login-content">
                <div className="login-content-title-wrapper">
                    <span className="login-content-title">Log in</span>
                </div>
                <div>
                    <Input
                        placeholder="Email Address"
                        className="login-email-field"
                    />
                </div>
                <div>
                    <Input
                        placeholder="Password"
                        className="login-password-field"
                    />
                </div>
                <div>
                    <span className="forgot-password-text">
                        Forgot Password?
                    </span>
                </div>
                <div className="login-btn-container">
                    <Button
                        className="login-btn"
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}