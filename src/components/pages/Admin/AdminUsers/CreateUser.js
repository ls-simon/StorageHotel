import React from "react";
import {Link, Redirect} from "react-router-dom";
import {get, post} from "../../../../handlers/requestHandlers";
import Dropdown from "../../../MenuComponents/Dropdown/Dropdown";
import {makeCustomerData} from './../../../../handlers/dataHandlers.js';
import {customerProfileFieldsAreValidated} from './../../../../handlers/fieldsValidator';
import { publisherNotSetOnClientProfileCreationWarning } from "../../../../handlers/exceptions";
import {connect} from "react-redux";
import {signUp} from "./../../../../redux/actions/authActions"

class CreateUser extends React.Component{
    
    constructor(props){
        super(props);

        this.state={
            userType:"client",
            userName:"",
            password:"",
            passwordRepeat:"",
            //ContactInformation
                email: "",
                phoneNumber: "",
                nickName: "",
                address: "",
                city: "",
                zipCode: "",
            
            publishers: [],
        }
    }

    componentDidMount(){this.getPublishers();}

    getPublishers() {


        //TODO: gør listen af employees depedent på firebase

       let publishers = [];
       publishers.push({nickName:"Independent client",userType:"Create",hexId:"IC"});
       this.setState({ publishers: publishers});
       
    }

    onChange = (e) => {this.setState({[e.target.name]:e.target.value});}


    showPublisherDropdown(flag){

        this.setState({
            publisherTableShows: flag
        })
    }

    toggleUserType = () =>{

        if(this.state.userType === "client"){
            this.setState({userType:"publisher"});
        } else {
            this.setState({userType:"client"});
        }
    }

    onSubmit=(e)=>{
        e.preventDefault();
        this.props.signUp(this.state);
        
        window.alert("To ensure that the user has been created the right way you will now be logged in by that user.\n Please verify the information is correct.")
        //Todo: Display confirmation or error
    }

    displayConfirmation() {

        let id = this.state.selectedActorHexId;
        if (id === "IC") {
            window.alert("Independent Client has been created");
        } else {
            window.alert("Client " + this.state.nickName +
        " has been added under publisher " + this.state.publishers.find(x=> x.hexId === this.state.selectedActorHexId).nickName);
        }
    }


    setSelected = (e) =>{
        console.log(e.target.value)
        if (e.target.value.toLowerCase() !== 'choose customer') {
            
            this.setState({
                selectedActorHexId:e.target.value,
                selectedActorUserType:this.state.publishers.find(x=>x.hexId===e.target.value).userType.toUpperCase()
            },()=>{console.log(this.state)})
        } else {
            publisherNotSetOnClientProfileCreationWarning();
        }
    }

    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }if(this.props.profile.userType !== "employee"){
            return <Redirect to="/Home"/>
        }
        return(
            <div className="PageStyle customText_b">
                <h1 className="customText_b_big text-center">Create a new user</h1>
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={this.onSubmit}>
                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="email">Email:</label>
                            </div>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Fx. example@example.com" onChange={this.onChange} required/>
                        </div>
                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="password">Password:</label>
                            </div>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Minimum 6 characters" onChange={this.onChange} required autoFocus/>
                        </div>
                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="passwordRepeat">Repeat Password:</label>
                            </div>
                            <input type="password" className="form-control" id="passwordRepeat" name="passwordRepeat" placeholder="Repeat typed password" onChange={this.onChange} required autoFocus/>
                        </div>
                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="nickName">Name:</label>
                            </div>
                            <input type="text" className="form-control" id="nickName" name="nickName" placeholder="Name of the company" onChange={this.onChange} required/>
                        </div>
                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="phone">Phone number:</label>
                            </div>
                            <input type="number" className="form-control" id="phone" name="phoneNumber" placeholder="12345678" onChange={this.onChange} required/>
                        </div>

                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="address">Address:</label>
                            </div>
                            <input type="text" className="form-control" id="address" name="address" placeholder="Fx. Industrivej 2" onChange={this.onChange} required/>
                        </div>

                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="city">City:</label>
                            </div>
                            <input type="text" className="form-control" id="city" name="city" placeholder="Fx. Aalborg" onChange={this.onChange} required/>
                        </div>

                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="zipCode">Zipcode:</label>
                            </div>
                            <input type="text" className="form-control" id="zipCode" name="zipCode" placeholder="Fx. 9000" onChange={this.onChange} required/>
                        </div>

                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="publisher?">Publisher?:</label>
                            </div>
                            <input type="checkbox" className="form-control"  onChange={this.toggleUserType}/>
                        </div>

                        <label className="input-group-text" htmlFor="dropdown">If Client, please choose publisher:</label>
                        <Dropdown className="form-control" actors = {this.state.publishers} action={this.setSelected} id="dropdown"/>
   
                        <div className="row">
                            <div className="col my-3 mx-4">
                                <button className="btn green_BTN btn-block" type="submit">Create User</button>
                            </div>
                            <div className="col my-3 mx-4">
                                <Link to="/Admin/Users/" className="btn adminUserBtn std_BTN btn-block">Go Back</Link>
                            </div>
                        </div>
                    </form>  
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signUp: (payload) => dispatch(signUp(payload))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateUser)