import React, {Component} from 'react';
import "../../Pages.css";
import "./AdminStock.css";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {updateProductAction} from './../../../../redux/actions/productActions'



class Edit extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            ...this.props.selectedProduct
        } 
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }
    
    onChange = (e) => {
         this.setState({[e.target.name]: e.target.value});
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        console.table(this.state);
        
        this.props.updateProduct(this.state)
        this.props.history.push("/Admin/Stock/")
    }
    
    render(){
        
        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }
        if (this.props.selectedProduct) {
            
            
            return( 
                <div className="PageStyle adminReduceFontSize customText_b ">
                <nav class="navbar navbar-light bg-light">
                <h1 className="customText_b_big">Edit product:</h1>
                <h1 className="subTitle customText_b">{this.state.productName} </h1>
                </nav>
                <div className=" row">
                <div className="col-md-4 offset-md-5 my-5">
                <div className="input-group-prepend my-2">
                <input
                type="text"
                name="productName"
                className="my-2 form-control "
                defaultValue={this.state.productName}
                onChange={this.onChange}
                placeholder="Product Name"/>
                </div>
                <div className="input-group-prepend my-2">
                <input
                type="text"
                className="my-2 form-control "
                name="productId"
                defaultValue={this.state.productId}
                onChange={this.onChange}
                placeholder="Product ID"/>
                </div>
                <div className="input-group-prepend my-2">
                <input
                type="text"
                className="my-2 form-control "
                name="quantity"
                defaultValue={this.state.quantity}
                onChange={this.onChange}
                placeholder="Quantity"/>
                </div>
                </div>
                <div className="col-md-6 offset-md-5">
                <button className="yellow_BTN btn-lg btn-block btn my-2" onClick={this.onSubmit} >Rediger produkt</button>
                <Link to="/Admin/Stock" className="std_BTN btn-lg btn-block btn my-2">Tilbage</Link>
                </div>
                </div>
                </div>
                );
                
            } else {
                
                return (
                    <h1>Vent venligst..</h1>
                )
            }        
        }
        
    }
    
    const mapStateToProps = (state) =>{
        return{
            auth: state.firebase.auth,
            selectedProduct: state.productReducer.selectedProduct
        }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            updateProduct: (payload) => dispatch(updateProductAction(payload))
        } 
    }
    
    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));