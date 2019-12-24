import React from 'react'
import fire, { provider} from '../../config/fire';

export default class ForgotPassword extends React.Component{
    constructor(props){
        super(props);
        this.ResetPassword = this.ResetPassword.bind(this);
    }
    ResetPassword(){
        const email = document.querySelector("#email").value
        alert(email)
        fire.auth().sendPasswordResetEmail(email);
    }
    render(){
        return(
            <div>
                
                <input type ="email" id = "email" placeholder="Enter your Email Id"  ></input>
                <br></br>
                <br></br>              
                <button type="submit" class="btn btn-outline-primary" onClick = {this.ResetPassword}>Send Email</button>
                <br>
                </br>
               
            </div>
        )
    }
}
