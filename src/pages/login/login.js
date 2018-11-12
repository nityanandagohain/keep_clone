import React, { Component } from 'react';
import fire from '../../config/fire';

export default class Login extends Component {


    constructor(props) {
        super(props);
        //binding the function
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    async login(e) {
        e.preventDefault();
        try {
            let user = await fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            console.log(`successfully Signed In ${user}`);
        } catch (err) {
            console.log(err);
        }
    }

    async signup(e) {
        e.preventDefault();
        try {
            let user = await fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            console.log(`successfully Signed Up ${user}`);
        } catch (err) {
            console.log(err);
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="col-md-6">
                <form id="Login">
                    <div className="form-group">
                        <input value={this.state.email} onChange={this.handleChange} name="email" type="email" className="form-control" id="inputEmail" placeholder="Email Address" />
                    </div>
                    <div className="form-group">
                        <input value={this.state.password} onChange={this.handleChange} name="password" type="password" className="form-control" id="inputPassword" placeholder="Password" />
                    </div>
                    <button onClick={this.login} type="submit" className="btn btn-primary">Login</button>
                    <button onClick={this.signup} type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        );
    }
}