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
           city:""
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
        this.props.setZipCode(this.state.zipCode)
        this.props.setCity(this.state.city)

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
        console.log(this.props.newOrder)
        console.log(this.props);
        
        if (this.props.newOrder) {
            
        let lines = this.props.newOrder.orderLines

        if(lines){
            lines = lines.map((line, i)=>{return(
                <tr key={i}>
                    <th scope="row">{line.product.productId}</th>
                    <td>{line.product.productName}</td>
                    <td>{line.amount}</td>
                </tr>
            )})
        }

        return(
            <div className="PageStyle customText_b">
                <h2 className="customText_b_big">Ordrelinjer:</h2>
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
                            <h4 className="text-center my-2">Adresse:</h4>

                            <form onSubmit={this.confirmed}>
                                <input type="text" className="input-group mb-3" name="company" onChange={this.onChange} placeholder="Virksomhed" required/>
                                <input type="text" className="input-group mb-3" name="contact" onChange={this.onChange} placeholder="Kontaktperson" required/>
                                <input type="number" className="input-group mb-3" name="phone" onChange={this.onChange} placeholder="Telefonnummer" required/>
                                <input type="text" className="input-group mb-3" name="address" onChange={this.onChange} placeholder="Adresse" required/>
                                <input type="number" className="input-group mb-3" name="zipCode" onChange={this.onChange} placeholder="Postnummer" required/>
                                <input type="text" className="input-group mb-3" name="city" onChange={this.onChange} placeholder="By" required/>
                               
                                <button className="green_BTN btn btn-block mt-5 mb-2" type="submit">Send order</button>
                            </form>
                            <button className="red_BTN btn btn-block" onClick={this.back}>Cancel order</button>
                        </div>
                    </div>        
                </div>
            </div>
        );
    } else {
        return (<h1>Vent venligst..</h1>)
    }
    }
}

const mapStateToProps = (state)=>{
    return{
        auth: state.firebase.auth,
        newOrder: state.orderReducer.newOrder,
        userType: state.loginReducer.userType
    }
}

const mapDispatchToProps = (dispatch) =>{
    
    return{
        setCompany: (company) => {dispatch({type: "SET_COMPANY",payload: {company}})},
        setContactPerson: (contactPerson) => {dispatch({type: "SET_CONTACTPERSON",payload: {contactPerson}})},
        setPhoneNumber: (phoneNumber) => {dispatch({type: "SET_PHONENUMBER",payload: {phoneNumber}})},
        setAdress: (address) => {dispatch({type: "SET_ADDRESS",payload: {address}})},
        setZipCode: (zipCode) => {dispatch({type: "SET_ZIP",payload: {zipCode}})},
        setCity: (city) => {dispatch({type: "SET_CITY",payload: {city}})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderCart);