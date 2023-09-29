import { ObjectID } from "bson";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services";
import { User } from "../../types";
import './styles.css'
import { Button, Input } from "antd";



export function SignUp() {
    
    const [userInfo, setUserInfo] = useState<any>({})
    const navigate = useNavigate();


    function onUserInfoChange(value: any, field: any) {
        let workingObj = userInfo;
        workingObj[field] = value
        setUserInfo(workingObj)
        console.log('workingObj', workingObj)
    }


    function onSubmitSignup(new_user_data: any) {
        new_user_data.preventDefault()
        const user_to_add_obj = {
            'id': new ObjectID().toString(),
            'firstName': userInfo?.firstName,
            'lastName': userInfo?.lastName,
            'email': userInfo?.email,
            'password': userInfo?.password,
            'role': 'user',
        }

        let to_add : User  = JSON.parse(JSON.stringify(user_to_add_obj));
  
        userService.createNewUser(to_add).then((resp: any) => {
            console.log('resp', resp)
            navigate('/login')
        })
    }


    return (
        <div className='signup-component'>
            <div className="signup-content">
                <div className="signup-content-title-wrapper">
                    <span className="signup-content-title">Sign Up</span>
                </div>
                <div>
                    <Input
                        placeholder="First Name"
                        className="signup-field"
                        onChange={(e) => onUserInfoChange(e?.target?.value, 'firstName')}
                    />
                </div>
                <div>
                    <Input
                        placeholder="Last Name"
                        className="signup-field"
                        onChange={(e) => onUserInfoChange(e?.target?.value, 'lastName')}
                    />
                </div>
                <div>
                    <Input
                        placeholder="Email Address"
                        className="signup-field"
                        onChange={(e) => onUserInfoChange(e?.target?.value, 'email')}
                    />
                </div>
                <div>
                    <Input
                        placeholder="Password"
                        className="signup-field"
                        onChange={(e) => onUserInfoChange(e?.target?.value, 'password')}
                    />
                </div>
                <div>
                    <Input
                        placeholder="Confirm Password"
                        className="signup-field"
                        onChange={(e) => onUserInfoChange(e?.target?.value, 'confirmPassword')}
                    />
                </div>
                <div>
                    <span className="terms-text">
                        By creating an account, you agree to our <br/>
                        Privacy Policy and Terms of Use.
                    </span>
                </div>
                <div className="signup-btn-container">
                    <Button
                        className="signup-btn"
                    >
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    )
}