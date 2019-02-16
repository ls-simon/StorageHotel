import React from 'react';
import "../../Pages.css";
import "./AdminProfile.css";
import {Link, Redirect} from "react-router-dom"
import {post} from './../../../../handlers/requestHandlers.js';
import {connect} from "react-redux";
import {signUpEmployee} from "./../../../../redux/actions/authActions";

class AdminAdd extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            nickName: "",
            password: "",
            userType: "employee"
        };
    }

    onChange = (e) => {this.setState({[e.target.name]: e.target.value});}

    onSubmit = (e) =>{
        e.preventDefault();

        this.props.signUp(this.state);
    }

    render() {

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        return(
            <div className="PageStyle customText_b">
                <div className="container col mb-3">
                    <h1 className="customText_b_big text-center display-3">Add new employee:</h1>
                    <div className="container">
                        <form onSubmit={this.onSubmit}>
                            <input 
                                type="email" 
                                className="form-control mb-2" 
                                onChange={this.onChange}
                                name="email"
                                placeholder="Email" required/>
                            <input 
                                type="text" 
                                className="form-control mb-2" 
                                onChange={this.onChange}
                                name="nickName"
                                placeholder="Nickname" required/>
                            <input 
                                type="password" 
                                className="form-control mb-2" 
                                onChange={this.onChange}
                                name="password"
                                placeholder="New password" required/>

                                <button type="submit" className="green_BTN btn-lg btn-block btn my-2">Add new employee</button>
                        </form>
                        <Link to="/Admin/Profile" className="std_BTN btn-lg btn-block btn my-2">Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signUp: (payload) => dispatch(signUpEmployee(payload))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminAdd)