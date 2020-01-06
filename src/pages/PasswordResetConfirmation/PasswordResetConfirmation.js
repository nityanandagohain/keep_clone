import React from "react"
import Login from"../login/login"
import {BrowserRouter as Router,Redirect} from "react-router-dom" 
import "./PasswordResetConfirmation.css"

export default class PasswordResetConfirmation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            goBackToLogin:false
        }
        this.changeState = this.changeState.bind(this);
        this.goBackToLogin = this.goBackToLogin.bind(this)
    }
    changeState()
    {
        this.setState({
            goBackToLogin : !this.state.goBackToLogin
        })
    }
    goBackToLogin(){
        return (<Login></Login>)
    }
    render(){
        return(            
            <div>
                { this.state.goBackToLogin?<Login/>:
                     <div className = "box">
                        <h1>Email has been sent reset your password </h1>
                        <button class="btn btn-success" onClick={()=>this.changeState()}>Go Back To Login Page</button>               
                    </div>
                }              
            </div>
        )
    }
}