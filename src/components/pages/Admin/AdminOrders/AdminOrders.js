import React, {Component} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from 'react-redux-firebase';
import ReactTable from "react-table";
import {Link, Redirect} from "react-router-dom"

import "../../Pages.css";
import "./AdminOrders.css";
import {allProductsNotPackedWarning} from "./../../../../handlers/exceptions.js";
import {packListPDF, orderNotePDF} from "./../../../../handlers/pdfHandlers.js"
import {getColumnsFromArray} from "./../../../../handlers/columnsHandlers.js"
import firebase from "firebase/app"
import {db, flattenDoc} from './../../../../config/firebaseUtils.js'
import {setSelectedOrder} from './../../../../redux/actions/orderActions';
import { makeOrderLinesData } from '../../../../handlers/dataHandlers';

class AdminOrders extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            orders: [], 
            orderLines: [],
            selected: null, 
            selectedIndex: -1,
            selectedId: "",
            selectedItem: null,
            packed: {},
            allPacked: 0
        }
        
        this.setStateAsSelected = this.setStateAsSelected.bind(this);
        this.toggleRow = this.toggleRow.bind(this);
        this.finishOrder = this.finishOrder.bind(this);
        
    }
    
    componentDidMount() { 
    }
    
    makeOrderLinesData = (rowInfo) => {
        let orderLines = []
        let orders = this.props.orders
        let products = this.props.products
        let selectedOrder = orders.filter((order) => order.id === rowInfo.original.id)[0]
        
        selectedOrder.orderLines.forEach((orderLine) => {
            
            products.forEach((product) => {
            
                if (product.id == orderLine.productId) {
                    orderLines.push({
                        ...product,
                        amount: orderLine.amount
                    })
                }
            })
        })
        
        return orderLines;
    }
    
    setStateAsSelected = (rowInfo) => {
        const orderLines = this.makeOrderLinesData(rowInfo);
        this.setState({orderLines: orderLines})
    }
    
    showOrderLines = (rowInfo) => {     
    }
    
    toggleRow(productName) {
        
		const packedItem = Object.assign({}, this.state.packed);
		packedItem[productName] = !this.state.packed[productName];
        this.setState({
			packed: packedItem,
			selectAll: 2
		});
	}
    
	toggleSelectAll() {
        
		let packedItem = {};
        
		if (this.state.selectAll === 0) {
			this.state.data.forEach(x => {
				packedItem[x.productName] = true;
			});
        }
        
		this.setState({
			packed: packedItem,
			allPacked: this.state.allPacked === 0 ? 1 : 0
        });
    }
    
    getCheckBoxColumn() {
        
        const checkBoxColumn = {
            id: "checkbox",
            accessor: "",
            Cell: ({ original }) => {
                return (
                    <input
                    type="checkbox"
                    className="checkbox"
                    checked={this.state.packed[original.productName] === true}
                    onChange={() => this.toggleRow(original.productName)}
                    />
                    );
                },
                Header: x => {
                    return (
                        <input
                        type="checkbox"
                        className="checkbox"
                        checked={this.state.selectAll === 1}
                        ref={input => {
                            if (input) {
                                input.indeterminate = this.state.selectAll === 2;
                            }
                        }}
                        onChange={() => this.toggleSelectAll()}
                        />
                        );
                    }
                }
                return checkBoxColumn;
            }
            
            sendToPage = (address) => {
                this.props.history.push(address);
            }
            
            finishOrder = (e) => { 
                e.preventDefault()
            }
            
            deleteOrder = (e) => {    
                e.preventDefault()        
            }
            
            goToEdit = (event) =>{
                event.preventDefault();
                if(this.state.selectedItem !== null){
                    this.props.setSelectedOrder(this.state.orders[this.state.selected]);
                    this.props.history.push("/Admin/Orders/Edit/"+this.state.selectedId)
                } else {
                    window.alert("Please select an order to edit.")
                }
            }
            
            
            
            render() {
                
                if(!this.props.auth.uid){
                    return <Redirect to="/"/>
                }

                const orderColumns = getColumnsFromArray(["Owner Name", "Date", "Order Id"]);
                let orderLineColumns = getColumnsFromArray(["Product Id", "Product Name", "Amount"]);
                orderLineColumns.push(this.getCheckBoxColumn());
                
                return (
                    <div className="PageStyle AdminOrderFontMinimize customText_b">
                    <div className="frameBordering">
                    <div className="AdminOrderLeft">
                    <div className="leftReactTableAdminOrder OrderList ">
                    <ReactTable 
                    data={this.props.orders}
                    columns={orderColumns} 
                    showPagination={false} 
                    className=" -striped -highlight darkenReactTable"
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                onClick: (e) => {
                                    console.log(this.props.orders)
                                    e.preventDefault();
                                    this.setStateAsSelected(rowInfo);
                                    this.showOrderLines(rowInfo);
                                },
                                style: {
                                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                }
                            }
                        }else{
                            return {}
                        }
                    }
                }
                style={{height: "100%"}}
                />
                </div>
                <div className=" md-2 my-2">
                <button type= "button" className="AdinOrderButtonSizer btn green_BTN mx-2" onClick={()=>this.sendToPage("/Admin/Orders/New")}>Create order</button>                           
                <button className="AdinOrderButtonSizer btn yellow_BTN mx-2" onClick={this.goToEdit}>Edit order </button>
                <button type= "button" className="AdinOrderButtonSizer btn red_BTN mx-2"  onClick={()=>this.deleteOrder()}>Delete order</button>
                </div>
                </div>
                
                
                <div className="AdminOrderRight">
                <div className="Table rightReactTableAdminOrder">
                <ReactTable data={this.state.orderLines}
                columns={orderLineColumns} 
                showPagination={false} 
                className="-striped -highlight"
                style={{height: "100%"}}
                />
                <div className="  px-1">
                </div>
                </div> 
                <button type= "button" className="AdinOrderButtonSizer btn std_BTN mx-2" onClick={()=>packListPDF(this.state.selectedItem)} >Export order</button> 
                <button type= "button" className="AdinOrderButtonSizer btn blue_BTN mx-2" onClick={this.finishOrder}>Finish order</button> 
                </div>    
                </div>    
                </div>
                )
            }
        }
        
        const mapStateToProps = state => {
            console.log(state);
            
            return {
                orders: state.firestore.ordered.orders,
                products: state.firestore.ordered.products,
                auth: state.firebase.auth
            } 
        }
        const mapDispatchToProps = (dispatch) => {
            return {}
        }
        
        
        export default compose(
            connect(mapStateToProps, mapDispatchToProps), 
            firestoreConnect(
                [
                    {collection: 'orders'},
                    {collection: 'products'}
                ]))(AdminOrders)