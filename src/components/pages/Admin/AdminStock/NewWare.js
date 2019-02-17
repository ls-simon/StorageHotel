import React, { Component } from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import { Link } from "react-router-dom";

import {createProductAction} from "../../../../redux/actions/productActions";
import { withRouter } from "react-router-dom";
import "../../Pages.css";
import "./AdminStock.css";
import Dropdown from "../../../MenuComponents/Dropdown/Dropdown";
import {newProductIsValid} from './../../../../handlers/fieldsValidator.js';


class NewWare extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            currentProduct: this.props.product,
            product: {},
            ownerName : ""
        };
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount() {
    }
    
    onChange = (e) => {
        
        this.setState({product:{...this.state.product,[e.target.name]:e.target.value}})
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        let payload = this.state.product
        payload.ownerName = this.state.ownerName

        if (newProductIsValid(this.state.product)) {     
            this.props.createProduct(payload)
            this.props.history.push("/Admin/Stock");
            
        }
    }
    
    setSelected = (e) => {
        e.preventDefault()
       
        let ownerName = this.props.owners.filter((x) => x.id == e.target.value)[0].name
        this.setState({ ownerName:ownerName })
        this.setState({product:{...this.state.product,ownerRef:e.target.value}})
    }
    
    render() {
        
        const currentProduct = this.state.product;
       
        if (this.props.owners) {
            
        return (
            <div className="PageStyle adminReduceFontSize customText_b">
            <div className="frameBordering">
            <h1 className=" text-center">Add new product</h1>
            <form>
            <input
            type="text"
            name="productName"
            className="my-2 form-control  "
            defaultValue={currentProduct.productName}
            onChange={this.onChange}
            placeholder="Product Name" required/>
            <input
            type="number"
            name="productId"
            className="my-2 form-control "
            defaultValue={currentProduct.productId}
            onChange={this.onChange}
            placeholder="Product Id" required/>
            <input
            type="number"
            name="quantity"
            className="my-2 form-control"
            defaultValue={currentProduct.quantity}
            onChange={this.onChange}
            placeholder="Quantity" required/>
            <Dropdown className="dropdownSmallSizeForNew" actors={this.props.owners} action={this.setSelected}/>
            
            <div className="" action="/Admin/Stock">
            <button className="green_BTN btn-lg btn-block btn my-2" type="submit" onClick={this.onSubmit}>Create product</button>
            </div>
            </form>
            <Link to="/Admin/Stock" className="std_BTN btn-lg btn-block btn my-2">Back</Link>
            </div>
            </div>
            )     
        } else { return <h1 className=" text-center">Vent venligst..</h1>}
    }
    }
    
    const mapDispatchToProps = (dispatch)=>{
        return{
            createProduct: (payload) => dispatch(createProductAction(payload))
        }
    }

    const mapStateToProps = (state) => {
        return {
            owners: state.firestore.ordered.users
        }
    }
    
    export default compose(
        connect(mapStateToProps, mapDispatchToProps), 
        firestoreConnect(
        [{
        collection: 'users', where: ['customer','==',true]
    }]
    ))(NewWare)
    