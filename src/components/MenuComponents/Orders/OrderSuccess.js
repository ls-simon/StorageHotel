import React from 'react';
import "./Order.css";
import "./Cart.css";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";

 class UserCartConfirm extends React.Component {
     
    constructor(props) {
        super(props);

        this.state = {
            products: props.productList,
            address: {}
        };
    }
 
    goBack = () =>{

        //TODO: DELETE REDUX HERE
        if(this.props.userType==="EMPLOYEE"){
            this.props.history.push("/Admin/Orders")
        } else {
            this.props.history.push("/User/Order")
        }
    }

    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        const address = this.props.address;
        let lines = this.props.orderLines;
       
        if (lines !== undefined) {
        lines = lines.map((line, i)=>{return(
                <tr key={i}>
                    <th scope="row">{line.productId}</th>
                    <td>{line.productName}</td>
                    <td>{line.amount}</td>
                </tr>
            )});
        }

        return(
            <div className="PageStyle rounded">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="container my-3">
                                <table className="table table-dark">
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

                        <div className="col bg-secondary">
                            <h4 className="display-4">Success!</h4>
                            <br/>
                            <br/>
                            <label className="font-weight-bold">Company name: </label>
                            <label className="font-weight-normal">{address.company}</label>
                            <br/>
                            <label className="font-weight-bold">Recipient: </label>
                            <label className="font-weight-normal">{address.contactPerson}</label>
                            <br/>
                            <label className="font-weight-bold">Phone: </label>
                            <label className="font-weight-normal">{address.phoneNumber}</label>
                            <br/>
                        
                            <br/>
                            <label className="font-weight-bold">Address: </label>
                            <label className="font-weight-normal">{address.address}</label>
                            <br/>
                            <label className="font-weight-bold">Zip: </label>
                            <label className="font-weight-normal">{address.zip}</label>
                            <br/>
                            <label className="font-weight-bold">City</label>
                            <label className="font-wight-normal">{address.city}</label>
                            <br/>
                            <label className="font-weight-bold">Country: </label>
                            <label className="font-weight-normal">{address.country}</label>
                        
                            <button className="btn-std btn btn-block my-3" onClick={this.goBack} role="button">Back</button>
                            
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
        orderLines: state.orderReducer.orderLines,
        employeeUser:state.orderReducer.customer,
        address: state.addressReducer,
        userType: state.loginReducer.userType,
        userId: state.loginReducer.userId
    }
}

export default connect(mapStateToProps)(UserCartConfirm);