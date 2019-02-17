import React, { Component } from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import "../../Pages.css";
import "./AdminStock.css";


import {makeProductsData} from './../../../../handlers/dataHandlers.js'
import {getColumnsFromArray} from './../../../../handlers/columnsHandlers.js';
import {get, del} from './../../../../handlers/requestHandlers.js';
import {entireStockPDF} from './../../../../handlers/pdfHandlers.js';
import {deleteProductAction} from './../../../../redux/actions/productActions'
import ClickTable from './../../../ReactTables/ClickTable'
import AdminStockButtonList from './../../../ButtonLists/AdminStockButtonList'


 class AdminStock extends Component {

    constructor(props) {
        super(props);
       
    }

    render() {

        const columns = getColumnsFromArray(["Product Id", "Product Name", "Owner Name", "Quantity"]);
       
        if (this.props.products) {
            
        return(
            <div className="PageStyle customText_b">
                <div className="frameBordering MainContainer container row">
                    <div className="Table container col">
                        <h1 className="customText_b_big">Stock</h1>

                        <ClickTable data={this.props.products} columns={columns}/>
                        <AdminStockButtonList products={this.props.products}/>

                    </div>
                </div>
            </div>   
        );
    }   else {
        return (
            <h1>Vent venligst...</h1>
        )
    }

    } 

    }
    

    const mapStateToProps = (state) => {
    return { 
    products: state.firestore.ordered.products
        }
    }

    const mapDispatchToProps = (dispatch) =>{
        
        return{
        deleteProduct: (id) => dispatch(deleteProductAction(id)),
        setProductId: (id) => {dispatch({type: "SET_PRODUCT_ID",payload: {id}})},
        setProductQuantity: (quantity) => {dispatch({type: "SET_PRODUCT_QUANTITY",payload: {quantity}})},
        setProductName: (name) => {dispatch({type: "SET_PRODUCT_NAME",payload: {name}})},
        }
    }   

export default compose(
    connect(mapStateToProps,mapDispatchToProps), 
    firestoreConnect(
    [{
    collection: 'products'
}]
))(AdminStock)
