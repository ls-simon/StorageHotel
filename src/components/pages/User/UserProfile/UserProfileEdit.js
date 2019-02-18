import React from 'react';
import "../../Pages.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { put } from "./../../../../handlers/requestHandlers";
import { userProfileFieldsAreValidated } from "./../../../../handlers/fieldsValidator";

class UserProfileEdit extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            city:"",
            zipCode:"",
            country:"",
            oldPassword: "",
            passwordNew:"",
            passwordNewRepeat:""}
    };

    onChange = (event) => {

        this.setState({[event.target.name]: event.target.value});
    }
    
    confirmed = (event) =>{
        event.preventDefault();
        
        let fields = this.state;
        if (userProfileFieldsAreValidated(fields)) {
          
            }
        
    }

    render() {

        return(
            <div className="PageStyle customText_b">
                <div className="frameBordering">
                    <h1 className="customText_b_big"> profile:</h1>
                    <div className="row">
                        <div className ="col-md-4 offset-md-4">
                            <form onSubmit={this.confirmed}>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon10">User Name</span>
                                    </div>
                                    <input
                                        name="name" 
                                        type="text" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        defaultValue={this.props.user.name} required/>

                                </div>

                                

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon8">Email</span>
                                    </div>
                                    <input
                                        name="email" 
                                        type="email" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        defaultValue={this.props.user.email} required/>
                                </div>
                                
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon7">Phonenumber</span>
                                    </div> 
                                    <input
                                        name="phoneNumber" 
                                        type="tel" 
                                        className="my-2 form-control" 
                                        onChange={this.onChange}
                                        defaultValue={this.props.user.phoneNumber} required/>
                                </div>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon6">Adress</span>
                                    </div>
                                <input
                                    name="address" 
                                    type="text" 
                                    className="form-control" 
                                    onChange={this.onChange}
                                    defaultValue={this.props.user.address} required/>
                                </div>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon5">City</span>
                                    </div>
                                    <input
                                        name="city" 
                                        type="text" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        defaultValue={this.props.user.city} required/>
                                </div>
                                
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon4">Zip Code</span>
                                    </div>
                                    <input
                                        name="zipCode" 
                                        type="text" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        defaultValue={this.props.user.zipCode} required/>
                                </div>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon5">Country</span>
                                    </div>
                                    <input
                                        name="country" 
                                        type="text" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        defaultValue={this.props.user.country} required/>
                                </div>
                                    
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon5">New password</span>
                                    </div>
                                    <input
                                        name="passwordNew"
                                        type="password" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        placeholder="New password" />
                                </div>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon5">Repeat password</span>
                                    </div>
                                    <input
                                        name="passwordNewRepeat" 
                                        type="password" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        placeholder="New password repeat" />
                                    </div>
                                <div className="newForm stockForm">
                                    <button className="btn btn-block yellow_BTN my-2" type="submit">Edit profile</button>
                                </div> 
                            </form> 
                            
                            <Link to="/User/Profile" className="std_BTN btn btn-block btn my-2">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth,
        user: state.profileReducer,
        userId: state.loginReducer.userId,
        userType: state.loginReducer.userType,
    }
}

export default connect(mapStateToProps)(UserProfileEdit)
