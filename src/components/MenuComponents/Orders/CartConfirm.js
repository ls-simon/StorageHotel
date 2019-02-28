import React from 'react';
import "./Order.css";
import "./Cart.css";
import { connect } from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {createOrderAction} from './../../../redux/actions/orderActions'

 class UserCartConfirm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            products: props.productList,
            userType: props.userType,
            address: {}
        };
    }

    confirmed = (event) => {

        const {newOrder, history, createOrder} = this.props
        let payload = this.constructOrder(newOrder)
        createOrder(payload)
    }
 
    constructOrder = (newOrder) => {

        return {
            date: new Date(),
            ownerRef: newOrder.selectedCustomer.id,
            ownerName: newOrder.selectedCustomer.name,
            orderLines: newOrder.orderLines.map((line) => {return {
                amount: line.amount,
                productRef: line.product.id
            }}),
            address: this.props.address
        }
    }
    goBack = () =>{
            this.props.history.push("/Home")
    }

    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        const address = this.props.address;
        if (this.props.newOrder) {

        
        let lines = this.props.newOrder.orderLines;
        
        if (lines !== undefined) {
        lines = lines.map((line, i)=>{return(
                <tr key={i}>
                    <th scope="row">{line.product.productId}</th>
                    <td>{line.product.productName}</td>
                    <td>{line.amount}</td>
                </tr>
            )});
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

                        <div className="col">
                            <h4 className="customText_b_big">Please verify:</h4>
                            <br/>
                            <label className="customText_b_bold">Company name: </label>
                            <label className="customText_b">{address.company}</label>
                            <br/>
                            <label className="customText_b_bold">Recipient: </label>
                            <label className="customText_b">{address.contactPerson}</label>
                            <br/>
                            <label className="customText_b_bold">Phone: </label>
                            <label className="customText_b">{address.phoneNumber}</label>
                            <br/>
                        
                            <br/>
                            <label className="customText_b_bold">Address: </label>
                            <label className="customText_b">{address.address}</label>
                            <br/>
                            <label className="customText_b_bold">Zip: </label>
                            <label className="customText_b">{address.zipCode}</label>
                            <br/>
                            <label className="customText_b_bold">City: </label>
                            <label className="customText_b">{address.city}</label>
                            <br/>
                            
                            <div onClick={this.confirmed} className="green_BTN btn-block my-3 btn" role="button">Confirm order</div>
                        
                            <button className="std_BTN btn btn-block my-3" onClick={this.goBack} role="button">Back</button>
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

    return {
        auth: state.firebase.auth,
        newOrder: state.orderReducer.newOrder,
        address: state.addressReducer,
        userType: state.loginReducer.userType,
        userId: state.loginReducer.userId
    }
}

    const mapDispatchToProps = (dispatch) => {
        return {
          createOrder: (payload) => dispatch(createOrderAction(payload))
        }
    }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserCartConfirm));