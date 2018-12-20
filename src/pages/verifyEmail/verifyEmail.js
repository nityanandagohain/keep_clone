import React, {Component} from 'react';

export default class VerifyEmail extends Component{
    render()
    {
        return(
            <div className="loader">
                <div style={{margin:'300px',fontSize:"40px"}}>
                    <p>Please Verify your email to continue using this app(Reload the app if email already verified).</p>
                </div>
            </div>
        );
    }
}