import React from 'react';
import {withRouter,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {get} from "./../../../handlers/requestHandlers"
import {signIn} from "./../../../redux/actions/authActions";

// The box for sign-in to the system
class SignInBox extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.state = {
            email:"",
            password:"",
        }
    }

    //Mapping the value of the textbox to the state
    onChange = (e) => {

        this.setState({[e.target.name]: e.target.value});
    }

    //This handles our login. Takes an event and calls axios.
    //Then we map the results to redux through dispatches before pushing the user to main.
    loginHandler = (event) => {

        event.preventDefault()
        this.props.signIn(this.state);
    }

    render(){

        const error = this.props.error;
        if(this.props.auth.uid){
            return <Redirect to="/Home"/>
        }

        return(
            //This is what we return and what the user sees.
            <div>
                
                <div className="col-sm makeRelative mx-auto mt-5">
                    <div className="mt-5">    
                        <form className="form-signin customText_b">
                            <div className="text-center mb-4">
                                <img src={require('../../../resources/4n_logo_mini.jpg')} className="logoPic" alt="The logo of 4N"/>
                                <h1 className="customText_b_big h3 mb-3 font-weight-normal">4N Mailhouse</h1>
                            </div>
                            <div className="input-group mb-3">
                                {error ? <p className="text-danger">{error}</p>:null}
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label htmlFor="email" ><span className="input-group-text" id="inputGroup-sizing-default">Email</span></label>
                                </div>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email@email.com" onChange={this.onChange} required autoFocus/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label htmlFor="password"><span className="input-group-text" id="inputGroup-sizing-default">Password</span></label>
                                </div>
                                <input type="Password" className="form-control" id="password" name="password" placeholder="Password" onChange={this.onChange} required/>
                            </div>

                            <button onClick={this.loginHandler} className="std_BTN btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>     
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    console.log(state)
    return {
        error: state.loginReducer.error,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{

    return {
        signIn: (creds) => dispatch(signIn(creds)),
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(withRouter(SignInBox))
