import React, {Component} from 'react';
import Login from '../login/login.js';

export default class VerifyEmail extends Component{
    constructor(props) {
        super(props);
        this.state = {
          verify: false,
        };
        this.verified = this.verified.bind(this);
      }
    verified(){
        this.setState({
            verify: !this.state.verify,
        });
    }
    render()
    {
        return(
            <div>
                {this.state.verify?
                <Login/>
            :
            <div className="loader">
                <div style={{margin:'300px',fontSize:"40px"}}>
                    <p>Please Verify your email to continue using this app(Reload the app if email already verified).</p>
                    <button className="btn btn-danger" style={{position:"fixed", top:"0",right:"0"}} onClick={this.verified}>Go back to login page</button>
                </div>
            </div>
            }
            </div>
        );
    }
}