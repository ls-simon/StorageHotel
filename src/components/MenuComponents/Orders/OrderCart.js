import React from 'react';
import "./Order.css";
import "./Cart.css";
import { connect } from "react-redux";
import {isOrderAddressValid} from './../../../handlers/fieldsValidator.js';
import {Redirect} from "react-router-dom";

class UserOrderCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           address:"",
           company:"",
           contact:"",
           phone:null,
           zipCode:"",
           city:"",
           country:""
        };
    }
 
    onChange = (e) => {

        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state});
    }

    confirmed = (e) =>{

        e.preventDefault();
        if (isOrderAddressValid(this.state)) {
            this.setStateToProps();
        }    
    }

    setStateToProps() {

        this.props.setAdress(this.state.address)
        this.props.setCompany(this.state.company)
        this.props.setContactPerson(this.state.contact)
        this.props.setPhoneNumber(this.state.phone)
        this.props.setZip(this.state.zip)
        this.props.setCity(this.state.city)
        this.props.setCountry(this.state.country)

        this.goToNextPage();
    }

    goToNextPage() {

        const userType = this.props.userType
        if(userType==="EMPLOYEE"){
            this.props.history.push("/Admin/Order/Cart/Confirm")
        } else {
            this.props.history.push("/User/Order/Cart/Confirm")
        }
    }

    back = (event) => {

        event.preventDefault();
        const userType = this.props.userType
        if(userType==="EMPLOYEE"){
            this.props.history.push("/Admin/Orders/New")
        }else{
            this.props.history.push("/User/Order/")
        }
        
    }

    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        let lines = this.props.orderLines.orderLines;

        if(lines !== undefined){
            lines = lines.map((line, i)=>{return(
                <tr key={i}>
                    <th scope="row">{line.productId}</th>
                    <td>{line.productName}</td>
                    <td>{line.amount}</td>
                </tr>
            )})
        }

        return(
            <div className="PageStyle customText_b">
                <h2 className="customText_b_big">Cart:</h2>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="container my-3">
                                <table className="table orderCartTable">
                                    <thead>
                                        <tr key="header">
                                            <th scope="col">Product ID</th>
                                            <th scope="col">Product name</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lines}                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col container">
                            <h4 className="text-center my-2">Where to send the order:</h4>

                            <form onSubmit={this.confirmed}>
                                <input type="text" className="input-group mb-3" name="company" onChange={this.onChange} placeholder="Company" required/>
                                <input type="text" className="input-group mb-3" name="contact" onChange={this.onChange} placeholder="Contact Person" required/>
                                <input type="number" className="input-group mb-3" name="phone" onChange={this.onChange} placeholder="PhoneNumber" required/>
                                <input type="text" className="input-group mb-3" name="address" onChange={this.onChange} placeholder="Address" required/>
                                <input type="number" className="input-group mb-3" name="zipCode" onChange={this.onChange} placeholder="Zip" required/>
                                <input type="text" className="input-group mb-3" name="city" onChange={this.onChange} placeholder="City" required/>
                                <input type="text" className="input-group mb-3" name="country" defaultValue="Denmark" onChange={this.onChange} placeholder="Country" required/>
                                
                                <button className="green_BTN btn btn-block mt-5 mb-2" type="submit">Send order</button>
                            </form>
                            <button className="red_BTN btn btn-block" onClick={this.back}>Cancel order</button>
                        </div>
                    </div>        
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{

    return{
        auth: state.firebase.auth,
        orderLines: state.orderReducer,
        userType: state.loginReducer.userType
    }
}

const mapDispatchToProps = (dispatch) =>{
    
    return{
        setCompany: (company) => {dispatch({type: "SET_COMPANY",payload: {company}})},
        setContactPerson: (contactPerson) => {dispatch({type: "SET_CONTACTPERSON",payload: {contactPerson}})},
        setPhoneNumber: (phoneNumber) => {dispatch({type: "SET_PHONENUMBER",payload: {phoneNumber}})},
        setAdress: (address) => {dispatch({type: "SET_ADDRESS",payload: {address}})},
        setZip: (zipCode) => {dispatch({type: "SET_ZIP",payload: {zipCode}})},
        setCity: (city) => {dispatch({type: "SET_CITY",payload: {city}})},
        setCountry: (country) => {dispatch({type:"SET_COUNTRY", payload:{country}})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderCart);