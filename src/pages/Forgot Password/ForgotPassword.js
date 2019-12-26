import React from 'react'
import "./ForgotPassword.css"
import fire, { provider} from '../../config/fire';
import PasswordResetConfirmation from "../PasswordResetConfirmation/PasswordResetConfirmation"

export default class ForgotPassword extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            dark:"true",
            isEmailSent:"false",
        }
        this.ResetPassword = this.ResetPassword.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    changeColor()
    {
        this.setState({dark:!this.state.dark})
    }

    async ResetPassword(e){      
        const email = document.querySelector("#email").value       
        await fire.auth().sendPasswordResetEmail(email)
        .then(r => {
            console.log(r)
            console.log("sent")
            this.setState({isEmailSent:!this.state.isEmailSent})
          })
          .catch(error => {
            console.log(error)
            console.log("not")
          })      
    }
    render(){

        return(
            !this.state.isEmailSent?<PasswordResetConfirmation/>:
            <div className = {this.state.dark? "dark-mode" : "light-mode"}>
                    <nav>
                        <div className="toggle-container">
                            <span style={{ color: this.state.dark ? "grey" : "yellow" }}>☀︎</span>
                            <span className="toggle">
                                <input
                                checked={this.state.dark}
                                onChange={() => this.changeColor()}
                                id="checkbox"
                                className="checkbox"
                                type="checkbox"
                                />
                                <label htmlFor="checkbox" />
                            </span>
                            <span style={{ color: this.state.dark ? "slateblue" : "grey" }}>  ☾</span>                            
                        </div>
                    </nav>
                <div className = "body-forgot-password">                
                    <input type ="email" id = "email" placeholder="Enter your Email Id" ></input>
                        <br></br>
                        <br></br>              
                    <button type="submit" className={this.state.dark?"btn btn-outline-danger":"btn btn-success"} onClick = {()=>this.ResetPassword()}>Send Email</button>
                        <br>
                        </br>            
               </div>              
            </div>        
        )
    }
}
