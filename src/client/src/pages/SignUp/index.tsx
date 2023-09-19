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
    }


    function onSubmitSignup(new_user_data: any) {
        new_user_data.preventDefault()
        const user_to_add_obj = {
            'id': new ObjectID().toString(),
            'firstName': userInfo?.firstName,
            'lastName': userInfo?.lastName,
            'email': userInfo?.email,
            'password': userInfo?.password,
            'phoneNumber': userInfo?.phoneNumber,
            'role': 'user',
            'todos': [],
            'accountsInfo': [],
            'events': []
        }

        let to_add : User  = JSON.parse(JSON.stringify(user_to_add_obj));
  
        userService.createNewUser(to_add).then((resp: any) => {
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
                    />
                </div>
                <div>
                    <Input
                        placeholder="Last Name"
                        className="signup-field"
                    />
                </div>
                <div>
                    <Input
                        placeholder="Email Address"
                        className="signup-field"
                    />
                </div>
                <div>
                    <Input
                        placeholder="Password"
                        className="signup-field"
                    />
                </div>
                <div>
                    <Input
                        placeholder="Confirm Password"
                        className="signup-field"
                    />
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