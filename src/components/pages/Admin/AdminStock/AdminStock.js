import React, { Component } from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import "../../Pages.css";
import "./AdminStock.css";
import ReactTable from 'react-table';
import {makeProductsData} from './../../../../handlers/dataHandlers.js'
import {getColumnsFromArray} from './../../../../handlers/columnsHandlers.js';
import {get, del} from './../../../../handlers/requestHandlers.js';
import {entireStockPDF} from './../../../../handlers/pdfHandlers.js';
import {deleteProductAction} from './../../../../redux/actions/productActions'

 class AdminStock extends Component {

    constructor(props) {
        super(props);
        this.state = { selected: null, selectedId: "" };
    }


    sendToPage = (address) => {this.props.history.push(address);}

    changeToEditPage = () =>{

        if(this.state.selectedId !== ""){
            const item = this.state.products.find(x=>x.hexId===this.state.selectedId)
            this.props.setProductId(item.productId);
            this.props.setProductName(item.productName);
            this.props.setProductQuantity(item.quantity);
            this.props.history.push(`/Admin/Stock/Edit/${this.state.selectedId}`)

        } else{ 
            alert("Please choose an item to edit first.")
        }
    }

    deleteProduct = () => {

        if(this.state.selectedId !== ""){ 
            if(window.confirm("You are deleting an item")){
                console.log(this.state.selectedId);
                
                this.props.deleteProduct(this.state.selectedId)    
            }
        }
    }
    
    addProductToStock = () => {this.props.history.push("/Admin/Stock/New")}

    render() {

        console.log(this.props.products)
        let selectedId = this.state.selectedId
        const columns = getColumnsFromArray(["Product Id", "Product Name", "Owner Name", "Quantity"]);

        return(
            <div className="PageStyle customText_b">
                <div className="frameBordering MainContainer container row">
                    <div className="Table container col">
                        <h1 className="customText_b_big">Stock</h1>

                        <ReactTable
                            data={this.props.products} 
                            columns={columns} 
                            showPagination={false} 
                            className="-striped -highlight"
                            getTrProps={(state, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                return {
                                    onClick: (e) => {
                                        
                                    this.setState({selected: rowInfo.index, selectedId: rowInfo.original.id })
                                    },
                                    style: {
                                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                    }
                                }
                                } else {
                                    return {}
                                }
                            }}
                            style={{height: "60vh"}}
                        />
                        
                        <div className="CRUD container row">
                            <div className="">
                                <button  className="green_BTN stockBTNSizer btn my-2" onClick={this.addProductToStock}>New</button>
                            </div>

                            <div action="/Admin/Stock/Edit" className="">
                                <button  className="yellow_BTN stockBTNSizer btn my-2" onClick={this.changeToEditPage} >Edit</button>
                            </div>
                           
                            <div action="/Admin/Stock/Remove" className="">
                                <button  className="red_BTN stockBTNSizer btn my-2" onClick={this.deleteProduct}>Remove</button>
                            </div>

                            <button onClick={()=>entireStockPDF(this.state)} className="std_BTN stockBTNSizer btn my-2">Export</button>
                        </div>
                    </div>
                </div>
            </div>   
        );
    }

    }
    

    const mapStateToProps = (state) => {
    
    console.log("STATE ",state)
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
