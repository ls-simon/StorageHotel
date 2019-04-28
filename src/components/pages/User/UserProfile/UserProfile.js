import React, {Component} from 'react';
import "../../Pages.css";
import { connect } from "react-redux";

import { withRouter, Redirect } from "react-router-dom";
import {updateCustomerAction} from './../../../../redux/actions/userActions'
class UserProfile extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            city: "",
            zipCode: ""
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        
      
        let state = this.state
        let props = this.props.profile.contactInformation

        const payload = this.prepCustomerInfoDoc(state, props);
       
        
        this.props.updateCustomer(payload)
        //Info box 
    }

    prepCustomerInfoDoc = (state, props) => {
        
        
        if (!state.name || state.name === "") {
            state.name = this.props.profile.name
        }
        
        let requiredFields = Object.keys(props);

        requiredFields.forEach((key) => {

            !state[key] ? state[key] = props[key] : state[key] = state[key]
        })
        
        return {
            id: this.props.auth.uid,
            profile: {
                name:  state.name,
            contactInformation: {
                phoneNumber: state.phoneNumber,
                address: state.address,
                city: state.city,
                zipCode: state.zipCode,
                email: state.email
            }
            }
        }
    }

    onChange = (event) => {

        this.setState({[event.target.name]: event.target.value});
    }

    render(){
        
        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }
        
        if (this.props.profile) {
            
            return(
                <div className="PageStyle customText_b">
                <div className="frameBordering">
                
                
                
                <div className="Container col-md-4 offset-md-4">
                <p className="h2">Redigér profil:</p><br></br>
                <div class="row mx-md-n5 mx-auto">
                <form class="form-group" onSubmit={this.onSubmit}>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon10">User Name</span>
                                    </div>
                                    <input
                                        name="name" 
                                        type="text" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        defaultValue={this.props.profile.name} required/>

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
                                        defaultValue={this.props.profile.contactInformation.email} required/>
                                </div>
                                
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon7">Telefonnummer</span>
                                    </div> 
                                    <input
                                        name="phoneNumber" 
                                        type="tel" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        defaultValue={this.props.profile.contactInformation.phoneNumber} required/>
                                </div>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon6">Adresse</span>
                                    </div>
                                <input
                                    name="address" 
                                    type="text" 
                                    className="form-control" 
                                    onChange={this.onChange}
                                    defaultValue={this.props.profile.contactInformation.address} required/>
                                </div>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon5">By</span>
                                    </div>
                                    <input
                                        name="city" 
                                        type="text" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        defaultValue={this.props.profile.contactInformation.city} required/>
                                </div>
                                
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon4">Postnummer</span>
                                    </div>
                                    <input
                                        name="zipCode" 
                                        type="text" 
                                        className="form-control" 
                                        onChange={this.onChange}
                                        defaultValue={this.props.profile.contactInformation.zipCode} required/>
                                </div>
                                <div className="newForm stockForm">
                                    <button className="btn btn-block yellow_BTN my-2" type="submit">Godkend og redigér</button>
                                </div> 
                            </form> 
                </div>              
                </div>
                </div>
                </div>
                );
            } else {
                return (
                    <h1>Vent venligst..</h1>
                    )
                }
            }
        }
        
        const mapStateToProps = (state) => {
            
            return {
                auth: state.firebase.auth,
                userID: state.loginReducer.userId,
                userType: state.loginReducer.userType,
                profile: state.firebase.profile
            }
        }
        
        const mapDispatchToProps = (dispatch) => {
            
            return {
                updateCustomer: (payload) => {dispatch(updateCustomerAction({type: "UPDATE_PROFILE",payload: payload}))},
            }
        }
        
        export default withRouter(
            connect(mapStateToProps,mapDispatchToProps) 
            (UserProfile))
            