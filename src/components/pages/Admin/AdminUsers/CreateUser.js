import React from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from "redux";

import {signUpCustomerAction} from "./../../../../redux/actions/authActions"
import { publisherNotSetOnClientProfileCreationWarning } from "../../../../handlers/exceptions";
import Dropdown from "../../../MenuComponents/Dropdown/Dropdown";

class CreateUser extends React.Component{
    
    constructor(props){
        super(props);

        this.state={
            userType:"client",
            name:"",
            password:"",
            passwordRepeat:"",
            //ContactInformation
                email: "",
                phoneNumber: "",
                address: "",
                city: "",
                zipCode: "",
            
            
            publishers: [],
            publisherTableShows: true
        }
    }



    onChange = (e) => {this.setState({[e.target.name]:e.target.value});}


    toggle = () =>{

        if(this.state.userType === "client"){
            this.setState({userType:"publisher", publisherTableShows: false});
        } else {
            this.setState({userType:"client", publisherTableShows: true});
        }
    }

    onSubmit=(e)=>{
        e.preventDefault();
        let payload = this.state
        
        this.props.signUpCustomer(this.state);
        
        window.alert("For at sikre at informationerne er korrekte, vil du nu blive logget ind som brugeren,"+
        "du nu har oprettet\n Verificér at informationerne er korrekte, før du igen logger ind som medarbejder")
    }

    displayConfirmation() {
        window.alert("Kunde oprettet!")
    }


    setSelected = (e) =>{
       
        const value = e.target.value.toLowerCase()
        
        if (value !== 'choose customer') {
            
        if (!value.includes('independent')) {
            this.setState({selectedActorId:e.target.value})
        } else {
            this.setState({selectedActorId:"INDEPENDENT_CLIENT"})
            
        }

    }
    }

    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }if(this.props.profile.userType !== "employee"){
            return <Redirect to="/Home"/>
        }
        if (this.props.users) {
            let publishers = this.props.users.filter((x)=> x.userType == 'publisher')
            publishers.push({name: "Uafhængig kunde", userType: "INDEPENDENT_CLIENT"})
          

        return(
            <div className="PageStyle customText_b">
                <h1 className="customText_b_big text-center">Opret ny kunde</h1>
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
                                <label className="input-group-text" htmlFor="passwordRepeat">Gentag Password:</label>
                            </div>
                            <input type="password" className="form-control" id="passwordRepeat" name="passwordRepeat" placeholder="Repeat typed password" onChange={this.onChange} required autoFocus/>
                        </div>
                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="name">Kundenavn:</label>
                            </div>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Name of the company" onChange={this.onChange} required/>
                        </div>
                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="phone">Telefonnummer:</label>
                            </div>
                            <input type="number" className="form-control" id="phone" name="phoneNumber" placeholder="12345678" onChange={this.onChange} required/>
                        </div>

                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="address">Adresse:</label>
                            </div>
                            <input type="text" className="form-control" id="address" name="address" placeholder="Fx. Industrivej 2" onChange={this.onChange} required/>
                        </div>

                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="city">By:</label>
                            </div>
                            <input type="text" className="form-control" id="city" name="city" placeholder="Fx. Aalborg" onChange={this.onChange} required/>
                        </div>

                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="zipCode">Postnummer:</label>
                            </div>
                            <input type="text" className="form-control" id="zipCode" name="zipCode" placeholder="Fx. 9000" onChange={this.onChange} required/>
                        </div>

                        <div className="input-group my-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="publisher?">Forlag?:</label>
                            </div>
                            <input type="checkbox" className="form-control"  onChange={this.toggle}/>
                        </div>
                        {this.state.publisherTableShows ?  <label className="input-group-text" htmlFor="dropdown">Vælg forlag:</label> : null}
                        {this.state.publisherTableShows ?  <Dropdown className="form-control" actors={publishers} action={this.setSelected} id="dropdown"/> : null}
                        
                        <div className="row">
                            <div className="col my-3 mx-4">
                                <button className="btn green_BTN btn-block" type="submit">Opret kunde</button>
                            </div>
                            <div className="col my-3 mx-4">
                                <Link to="/Admin/Users/" className="btn adminUserBtn std_BTN btn-block">Anullér</Link>
                            </div>
                        </div>
                    </form>  
                </div>
            </div>
        )
    } else {return (
        <h1>Vent venligst..</h1>
    )}
}   
}


const mapStateToProps = (state) =>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signUpCustomer: (payload) => dispatch(signUpCustomerAction(payload))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps), 
    firestoreConnect(
    [{
    collection: 'users'
}]
))(CreateUser)