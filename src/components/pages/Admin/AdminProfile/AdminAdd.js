import React from 'react';
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux";

import {signUpEmployeeAction} from "./../../../../redux/actions/authActions";
import "../../Pages.css";
import "./AdminProfile.css";

class AdminAdd extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            name: "",
            password: "",
            userType: "employee"
        };
    }

    onChange = (e) => {this.setState({[e.target.name]: e.target.value});}

    onSubmit = (e) =>{
        e.preventDefault();

        this.props.signUpEmployee(this.state);
        this.props.history.push('/Home')
    }

    render() {

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        return(
            <div className="PageStyle customText_b">
                <div className="container col mb-3">
                    <h1 className="customText_b_big text-center display-3">Ny medarbejder:</h1>
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
                                name="name"
                                placeholder="Navn" required/>
                            <input 
                                type="password" 
                                className="form-control mb-2" 
                                onChange={this.onChange}
                                name="password"
                                placeholder="New password" required/>

                                <button type="submit" className="green_BTN btn-lg btn-block btn my-2">Tilføj ny medarbejder</button>
                        </form>
                        <Link to="/Admin/Profile" className="std_BTN btn-lg btn-block btn my-2">Tilbage</Link>
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
        signUpEmployee: (payload) => dispatch(signUpEmployeeAction(payload))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminAdd)