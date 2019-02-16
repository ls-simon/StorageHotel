import React from 'react';
import "../../Pages.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {get} from "./../../../../handlers/requestHandlers";

class UserProfile extends React.Component{
    
    constructor(props){
        super(props);

        this.state= {
            userName: "...Loading",
            name: "...Loading",
            email: "...Loading",
            phoneNumber: "...Loading",
            address: "...Loading",
            city: "...Loading",
            zip: "...Loading",
            country:"...Loading"
        }
    }
  
    componentDidMount(){

        const type = this.props.userType
        if(type === "CLIENT"){
            get("clients/"+this.props.userID,(res)=>{
                this.setStateOnGetRequest(res)
            })   
        } else if(type === "PUBLISHER") {
            get("publishers/"+this.props.userID,(res)=>{
                this.setStateOnGetRequest(res)
            })   
        } else {alert("Something went horribly wrong.")}
    }

    setStateOnGetRequest = (data) =>{

        this.setState({
            userName:data.userName, 
            name: data.contactInformation.nickName, 
            email: data.contactInformation.email,
            phoneNumber:data.contactInformation.phoneNumber,
            address:data.contactInformation.address,
            city:data.contactInformation.city,
            zip:data.contactInformation.zipCode,
            country:data.contactInformation.country,
        })
    }

    prepForEdit = () =>{

        this.props.setAddress(this.state.address);
        this.props.setCity(this.state.city);
        this.props.setCountry(this.state.country);
        this.props.setEmail(this.state.email);
        this.props.setNickName(this.state.name);
        this.props.setPhoneNumber(this.state.phoneNumber);
        this.props.setUserName(this.state.userName);
        this.props.setZipcode(this.state.zip);
        this.props.history.push("/User/Profile/Edit")
    }

    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        return(
            <div className="PageStyle customText_b">
                <div className="frameBordering">
                    <h1 className="text-center">Profile information</h1>
                    <div className="row">
                        <div className="Container col-md-4 offset-md-4">
                            <h5 className="text-justify my-2">USERNAME: {this.state.userName}</h5>
                            <h5 className="text-justify my-2">NAME: {this.state.name}</h5>
                            <h5 className="text-justify my-2">EMAIL: {this.state.email}</h5>
                            <h5 className="text-justify my-2">PHONE NUMBER: {this.state.phoneNumber}</h5>
                            <h5 className="text-justify my-2">ADDRESS: {this.state.address}</h5>
                            <h5 className="text-justify my-2">CITY: {this.state.city}</h5>
                            <h5 className="text-justify my-2">ZIP: {this.state.zip}</h5>
                            <h5 className="text-justify my-2">COUNTRY: {this.state.country}</h5>

                            <button onClick={this.prepForEdit} className="btn-lg btn-block yellow_BTN my-2k btn">Edit</button>
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
        userID: state.loginReducer.userId,
        userType: state.loginReducer.userType
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        setNickName: (nickName) => {dispatch({type: "SET_PROFILE_NICKNAME",payload: {nickName}})},
        setUserName: (userName) => {dispatch({type: "SET_PROFILE_USERNAME",payload: {userName}})},
        setEmail: (email) => {dispatch({type: "SET_PROFILE_EMAIL",payload: {email}})},
        setPhoneNumber: (phoneNumber) => {dispatch({type: "SET_PROFILE_PHONENUMBER",payload: {phoneNumber}})},
        setAddress: (address) => {dispatch({type: "SET_PROFILE_ADDRESS",payload: {address}})},
        setZipcode: (zipCode) => {dispatch({type: "SET_PROFILE_ZIPCODE",payload: {zipCode}})},
        setCity: (city) => {dispatch({type: "SET_PROFILE_CITY",payload: {city}})},
        setCountry: (country) => {dispatch({type: "SET_PROFILE_COUNTRY",payload: {country}})},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile)