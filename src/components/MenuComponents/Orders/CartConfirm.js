import React from 'react';
import "./Order.css";
import "./Cart.css";
import { connect } from "react-redux";
import {makeOrderBodyFromData} from "../../../handlers/bodyHandlers";
import { post } from '../../../handlers/requestHandlers';
import {Redirect} from "react-router-dom";

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

        let orderLines = this.props.orderLines;
        const data = makeOrderBodyFromData(orderLines, this.props.address);

        let userId = this.props.employeeUser.userId ? this.props.employeeUser.userId : this.state.userId;
        let userType = this.props.employeeUser.userType ? this.props.employeeUser.userType.toLowerCase() : this.state.userType;
        let path = userType === 'employee' ? '/Admin/' : '/User/';
              
        post('orders/'+userId+'/'+userType, data, (response) => {

            if(response.includes("Created!")){
                
                this.props.history.push(path+'Order/Success')
            } else {
                
                this.props.history.push(path+'Order/Failed')

                }
            });
        
    }
 
    goBack = () =>{

        if(this.props.userType==="EMPLOYEE"){
            this.props.history.push("/Admin/Order/Cart")
        } else {
            this.props.history.push("/User/Order/Cart")
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
                            <label className="customText_b">{address.zip}</label>
                            <br/>
                            <label className="customText_b_bold">City</label>
                            <label className="customText_b">{address.city}</label>
                            <br/>
                            <label className="customText_b_bold">Country: </label>
                            <label className="customText_b">{address.country}</label>
                            
                            <div onClick={this.confirmed} className="green_BTN btn-block my-3 btn" role="button">Confirm order</div>
                        
                            <button className="std_BTN btn btn-block my-3" onClick={this.goBack} role="button">Back</button>
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