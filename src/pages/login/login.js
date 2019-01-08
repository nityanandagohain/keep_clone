import React, { Component } from 'react';
import fire, {provider } from '../../config/fire';
import './login.css'
import Loader from '../loader/loader';

export default class Login extends Component {
    constructor(props) {
        super(props);
        //binding the function
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.loginGoogle = this.loginGoogle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleLoader = this.toggleLoader.bind(this);
        this.authUser = this.authUser.bind(this);
        this.state = {
            email: '',
            password: '',
            loading: false,
        }
    }

    toggleLoader() {
        this.setState({
            loading: !this.state.loading,
        });
        console.log(this.state.loading);
    }

    async login(e) {
        e.preventDefault();
        //Display the loader
        this.toggleLoader();

        try {
            let user = await fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            console.log(`successfully Signed In ${user}`);
        } catch (err) {
            this.toggleLoader();
            console.log(err);
            var text = err;
            document.getElementById("error").innerHTML = text;
        }
    }

    async signup(e) {
        e.preventDefault();
        //Display the loader
        this.toggleLoader();

        try {
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
            this.toggleLoader();
            console.log(err);
            var text = err;
            document.getElementById("error").innerHTML = text;
        }
    }

    async loginGoogle(e) {
        e.preventDefault();
        
        try {
            let user = await fire.auth().signInWithPopup(provider) 
                .then((result) => {
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
        this.setState({ [e.target.name]: e.target.value })
    }

componentDidMount() {
    document.body.classList.add("background-white");
}

componentWillUnmount() {
    document.body.classList.remove("background-white");
}
    render() {
        return (
            this.state.loading ?
                <Loader />
                :
              <div className= "body">
                    <div className="card">
                    <div className="card-body">
                    <h1 className="card-title">KEEP CLONE</h1>
                    <div id="error"></div>
                    <form id="Login">
                       <form>
                            <div className="form-group">
                                <label for="exampleFormControlFile1">Email Adress</label>
                                <input value={this.state.email} onChange={this.handleChange} name="email" type="email" className="form-control" id="inputEmail" required/>
                            </div>
                        </form>

                       <form>
                               <div className="form-group">
                                <label for="exampleFormControlFile1">Password</label>
                                <input value={this.state.password} onChange={this.handleChange} name="password" type="password" className="form-control" id="inputPassword" required/>
                    </div>
                        </form>
                            <button onClick={this.login} type="submit" className="btn btn-outline-success btn-block  "  >Login</button>
                            <h1>        </h1> 
                            <button onClick={this.signup} type="submit" className="btn btn-outline-primary btn-sm" margin-right="5px">Sign Up</button>       
                            <h3>  </h3>
                            <button onClick={this.loginGoogle} type="submit" className="btn btn-outline-danger btn-sm">Sign In with Google</button>
                        </form>
                        
                    </div>
                    </div>
                    </div>
    
                   
        );
    }
}