import React,{Component} from 'react';
import { Link } from "react-router-dom";
import "../../Pages.css"
import "./EditOrderAddress.css"
import { get, post, del } from './../../../../handlers/requestHandlers.js';
import {makeOrderAddressData, makeOrderLinesData} from './../../../../handlers/dataHandlers.js';
import { connect } from 'react-redux';
import { makeOrderBodyFromData } from '../../../../handlers/bodyHandlers';


 class EditOrderAddress extends Component{

    constructor(props){
        super(props);
        
        this.state = { order: {} }
    }

    componentDidMount() {this.getOrder();}

    getOrder() {

        get("employee/order/"+this.props.match.params.id, (data) => {
            const orderLines = makeOrderLinesData(data);
            const order = makeOrderAddressData(data);
            order.orderLines = orderLines;
            order.owner = data.owner;

            this.setState({order: order})
        });
    }

    onChange = (e) => {

        const state = this.state.order;
        state[e.target.name] = e.target.value;
        this.setState({order:state});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const order = makeOrderBodyFromData(this.state.order.orderLines, this.state.order);

        del("orders/delete/"+this.props.match.params.id, (response) => {  
            window.alert(response);

            post("orders/"+order.owner.userHexId+"/"+order.owner.userType.toLowerCase(), order, (response) => {
                if (window.confirm("Address successfully updated!", response)) {
                    this.props.history.push("/Admin/Orders")
                }
            })
        });
    }

    
    render() {
        return(
            <div className="PageStyle customText_b">
                <div class="col-md-4 offset-md-4 mt-4">
                    <input type="text" name="company" defaultValue={this.state.order.company} className="my-2 form-control" onChange={this.onChange} placeholder="Company"/> 
                    <input type="text" name="contactPerson" defaultValue={this.state.order.contactPerson} className="my-2 form-control" onChange={this.onChange} placeholder="Contact Person"/>
                    <input type="text" name="phoneNumber" defaultValue={this.state.order.phoneNumber} className="my-2 form-control" onChange={this.onChange} placeholder="Phonenumber"/>
                    <input type="text" name="address" defaultValue={this.state.order.address} className="my-2 form-control" onChange={this.onChange} placeholder="Address"/>
                    <input type="text" name="zipCode" defaultValue={this.state.order.zipCode} className="my-2 form-control" onChange={this.onChange} placeholder="Zipcode"/>
                    <input type="text" name="city" defaultValue={this.state.order.city} className="my-2 form-control" onChange={this.onChange} placeholder="City"/>
                    <input type="text" name="country" defaultValue={this.state.order.country} className="my-2 form-control" onChange={this.onChange} placeholder="Country"/>

                    <button className="EOA_BTN AdinOrderButtonSizer btn yellow_BTN mx-2" onClick={this.onSubmit}>Save Changes</button>
                    <Link to="/Admin/Orders" className="EOA_BTN AdinOrderButtonSizer btn std_BTN mx-2 " role=" button" >Back</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps =(state) => {return {userId: state.loginReducer.userId}}

export default connect(mapStateToProps)(EditOrderAddress)