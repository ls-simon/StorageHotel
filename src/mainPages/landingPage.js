import React from 'react';
import LandingPage from "../components/MenuComponents/LandingPage/LandingPage";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom"

class Home extends React.Component{

    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        let landingPageButtons = []
        
        if(this.props.profile.userType==="client"){

            landingPageButtons = [
                {name:"Order",location:"./User/Order",id:"1"},
                {name:"Stock",location:"./User/Stock",id:"2"},
                {name:"Profile",location:"./User/Profile",id:"3"}
            ]
        } else if(this.props.profile.userType === "publisher"){

            landingPageButtons = [
                {name:"Order",location:"./User/Order",id:"1"},
                {name:"Stock",location:"./User/Stock",id:"2"},
                {name:"Profile",location:"./User/Profile",id:"3"},
                {name:"Clients",location:"./User/Clients",id:"4"},
            ]
        } else if(this.props.profile.userType === "employee"){

            landingPageButtons = [
                {name:"Orders",location:"./Admin/Orders",id:"1"},
                {name:"Users",location:"./Admin/Users",id:"2"},
                {name:"Stock",location:"./Admin/Stock",id:"3"},
                {name:"Profile",location:"./Admin/Profile",id:"4"}
        ]}
    
        return ( 
            <div className="PageStyle">
                <LandingPage buttons={landingPageButtons} name={this.props.profile.name}/>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log("HOME REDUX", state)
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
}
 
export default connect(mapStateToProps)(Home);