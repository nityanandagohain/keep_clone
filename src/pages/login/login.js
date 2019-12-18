import React, { Component } from 'react';
import fire, { provider, facebookProvider } from '../../config/fire';
import classes from './login.css';
import Loader from '../loader/loader';

export default class Login extends Component {
    constructor(props) {
        super(props);
        //binding the function
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.loginGoogle = this.loginGoogle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.closeLoader = this.closeLoader.bind(this);
        this.authUser = this.authUser.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.state = {
            dark:"true",
            email: '',
            password: '',
            loading: false,
            validity: {
                validMail: false,
                validPassword: false,
                touchedMail: false,
                touchedPW: false
            }
        }
    }

    showLoader() {
        this.setState({
            loading: true
        })
    }
    closeLoader() {
        this.setState({
            loading: false
        })
    }

    changeColor()
    {
        this.setState({dark:!this.state.dark})
    }

    async login(e) {
        e.preventDefault();

        //this.toggleLoader();
        this.showLoader()
        try {
            //Display the loader

            console.log(this.state)
            if(this.state.validity.validMail===false || this.state.validity.validPassword===false){
                console.log("THROWING ERROR")
                throw "Empty fields are there"
                return;
            }
            let user = await fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            console.log(`successfully Signed In ${user}`);
        } catch (err) {
            this.closeLoader()
            console.log(err);
            var text = err;
            var error = document.getElementById("error")
            if(error) {
                error.innerHTML = text;
            }
            if(text === "Empty fields are there")
            {
                this.setState({
                    validity: {
                        touchedMail: true,
                        touchedPW: true
                    }
                });
            }
        }
        //this.toggleLoader();
    }

    async signup(e) {
        e.preventDefault();
        //Display the loader
        this.showLoader();

        try {
            if(this.state.validity.validMail === false || this.state.validity.validPassword === false){
                console.log("Throwing error")
                throw "Empty fields are there"
                return;
            }
            let user = await fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            if(user.emailVerified)
                console.log("Email Verified");
            else
            {
                let res = this.authUser();
                console.log("Email Not Verified");
            }
            //console.log(res);
            console.log(`Successfully Signed Up ${user}`);
        } catch (err) {
            this.closeLoader();
            console.log(err);
            var text = err;
            var error = document.getElementById("error")
            if(error) {
                error.innerHTML = text;
            }
            if(text === "Empty fields are there")
            {
                this.setState({
                    validity: {
                        touchedMail: true,
                        touchedPW: true
                    }
                });
            }
        }
    }

    async loginGoogle(e) {
        e.preventDefault();
        
        try {
            let user = await fire.auth().signInWithPopup(provider) 
                .then((result) => {
                    console.log(result);
                  const user = result.user;
                  this.setState({
                    user
                  });
                  console.log(`Successfully Signed In using Google${user}`);
                });
        } catch (err) {
            console.log(err);
            var text = err;
            document.getElementById("error").innerHTML = text;
        }
    }

    loginFacebook=async (e)=>{
        e.preventDefault();
        
        try {
            let user = await fire.auth().signInWithPopup(facebookProvider) 
                .then((result) => {
                    console.log(result);
                  const user = result.user;
                  this.setState({
                    user
                  });
                  console.log(`Successfully Signed In using facebook${user}`);
                });
        } catch (err) {
            console.log(err);
            var text = err;
            document.getElementById("error").innerHTML = text;
        }
    }

    async authUser()
    {
        let user = fire.auth().currentUser;
        await user.sendEmailVerification().then(function(){
            console.log("Email sent");
        }).catch(function(err){
            console.log(err.message);
            var text = err.message;
            document.getElementById("error").innerHTML = text;
        });
    }

    handleChange(e) {
        e.preventDefault();
        // console.log('name is '+ e.target.name+' value is '+ e.target.value);
        console.log("Initially ");
        console.log(this.state);
        if(e.target.name === 'email'){
            var newState = {
                ...this.state,
                validity: {
                    ...this.state.validity
                }
            };
            newState = {
                [e.target.name]: e.target.value,
                validity: {
                    validMail: this.checkValidity(e.target.value),
                    validPassword: this.state.validity.validPassword,
                    touchedMail: true,
                    touchedPW: this.state.validity.touchedPW
                } 
            }
            this.setState(newState);
            //console.log(this.state.validity);
        }
        if(e.target.name === 'password'){
            var newState = {
                ...this.state,
                validity: {
                    ...this.state.validity
                }
            };
            newState = {
                [e.target.name]: e.target.value,
                validity: {
                    validMail: this.state.validity.validMail,
                    validPassword: this.checkValidity(e.target.value),
                    touchedMail: this.state.validity.touchedMail,
                    touchedPW: true
                }
            }
            this.setState(newState);
            //console.log(this.state.validity);
        }
        console.log("Finally");
        console.log(this.state);
    }

    checkValidity(value) {
        return value.trim() !== '';
    }   


    render() {
        var theme = this.state.dark ? "dark":"light"
        console.log("loading in render "+this.state.loading);
        return (
            
                this.state.loading ?
                    <Loader theme={this.state.dark}/>
                    :
                
                <div className={this.state.dark ? "dark-mode" : "light-mode"}>
                   
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
                    <div className = {this.state.dark ? "dark-mode" : "light-mode"}>
                    <div className = "body">
                        
                        <div className={this.state.dark ? "card bg-dark text-white" : "card bg-light text-dark"}>
                        <main>
                        
                        <h1 className="card-title">KEEP CLONE</h1>
                        <div id="error"></div>
                        <form id="Login">
                        <form>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1">Email Adress</label>
                                    <input value={this.state.email} onChange={this.handleChange} name="email" type="email" className={!this.state.validity.validMail && this.state.validity.touchedMail ? "form-control invalid":"form-control valid"} id="inputEmail" required/>
                                </div>
                            </form>

                        <form>
                            <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1">Password</label>
                                    <input value={this.state.password} onChange={this.handleChange} name="password" type="password" className={!this.state.validity.validPassword && this.state.validity.touchedPW ? "form-control invalid":"form-control valid"} id="inputPassword" required/>
                            </div>
                            </form>
                                <div className="login-buttons">
                                    <div>
                                    <button onClick={this.login} type="submit" className="btn btn-outline-success btn-block  "  >Login</button>
                                    <h1>        </h1> 
                                    <h1>        </h1>
                                    <button onClick={this.signup} type="submit" className="btn btn-outline-primary btn-sm" margin-right="5px">Sign Up</button>       
                                    <h3>        </h3>
                                    <h3>        </h3> 
                                    </div>
                                    <button onClick={this.loginGoogle} type="submit" className="btn btn-outline-danger btn-sm">Sign In with Google</button>
                                    <button onClick={ this.loginFacebook } type="submit" className="btn btn-outline-primary btn-sm ml-2">Sign In With Facebook</button>
                                </div>                                
                            </form>                            
                        </main>    
                        </div>   
                        </div>
                        </div>
                        </div>               
                    
                   
        );
    }
}