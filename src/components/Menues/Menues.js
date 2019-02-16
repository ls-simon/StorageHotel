import React from 'react';
import {withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import ButtonList from "../MenuComponents/ButtonList/ButtonList"
import "./Menues.css";
import {signOut} from "./../../redux/actions/authActions";

// The header component
class Header extends React.Component {

    //This happens when we exit
    exitHandler = (event) =>{
        event.preventDefault();

        this.props.logout()
        this.props.history.replace("/")
    }

    //This is what we render
    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        // Here we determine what buttons to send to the header. 
        // If the usertype does not match anything then we send the user back to the loginPage
        let buttons=[]
        const user = this.props.profile.userType;
        if(user==="employee"){
            buttons= [
                {name: "Home",location: "/Home", id:"1"},
                {name: "Orders",location:"/Admin/Orders", id:"2"},
                {name: "Users",location:"/Admin/Users",id:"3"},
                {name: "Stock",location:"/Admin/Stock",id:"4"},
                {name: "Profile",location:"/Admin/Profile",id:"5"}
            ]
        } else if(user==="client") {
            buttons=[
                {name: "Home",location: "/Home", id:"1"},
                {name: "Order",location:"/User/Order", id:"2"},
                {name: "Stock",location:"/User/Stock",id:"3"},
                {name: "Profile",location:"/User/Profile",id:"4"},
            ]
        } else if(user==="publisher") {
            buttons=[
                {name: "Home",location: "/Home", id:"1"},
                {name: "Order",location:"/User/Order", id:"2"},
                {name: "Stock",location:"/User/Stock",id:"3"},
                {name: "Profile",location:"/User/Profile",id:"4"},
                {name: "Clients",location:"/User/Clients",id:"5"}
            ]
        }

        //This the title is put in the header. 
        const name = this.props.profile.userType;
        const title= "4N: " + name + " menu" 

        //This is what we actually render.
        return(
            <div>
                <nav className="navbar bg-dark navbar-dark" style={{height: "100vh"}} >
                    <div className=" placeNavBarTop sidebar-sticky">
                        <ButtonList buttons={buttons} link={true}/>
                        <img 
                            src={require('../../resources/4n_logo_mini.jpg')} 
                                className=" placeNavBarTop navbar-icon justify-content-end" 
                                alt="The logo of 4N" />
                    </div>
                </nav>

                <nav className="header flex-row navbar navbar-expand navbar-dark fixed-top">
                    <div className="container customText_w">  
                        <h5 className="customText_w_medium titleText justify-content-start ">{title}</h5>
                        <form className="float-right justify-content-end">
                            <button onClick={this.exitHandler} className="logoutPlacer dark_BTN float-right btn btn-sm btn-secondary">Log Out</button>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}

//REDUX This takes the redux state and maps it to the props.
const mapStateToProps = (state)=>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
        }
}

//REDUX Gets a dispatch function and maps it to the props.
const mapDispatchToProps = (dispatch) =>{
    
    return {logout: () => {dispatch(signOut())}}
}

//The Header class is the default class that is exported. 
//Here the redux functions are also connected to the class
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));