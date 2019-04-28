import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from 'react-redux-firebase';
import ReactTable from 'react-table';
import "./UserOrder.css";
import {getColumnsFromArray} from './../../../../handlers/columnsHandlers.js';
import {deleteOrderAction} from './../../../../redux/actions/orderActions'
import ViewTable from './../../../ReactTables/ViewTable'

class UserOrder extends Component {
    
    constructor(props) {
        super(props);
        this.state = { orders: [], selected: null, selectedId: "", selectedOrder: null };
    }


    setStateAsSelected = (rowInfo) => {

        this.setState({selected: rowInfo.index, selectedId: rowInfo.original.id, selectedOrder: rowInfo.original });
    }

    showOrderLines(rowInfo) {
        let orderLinesRef = rowInfo.original.orderLines
        let orderLines = []
        orderLinesRef.forEach((o)=> {
            let product = this.props.products.filter(p => o.productRef.id === p.id)[0]
            orderLines.push({
                amount: o.amount,
                productName: product.productName,
                id: product.id,
                quantity: product.quantity
            })
        })

        this.setState({orderLines: orderLines});
    }

    deleteOrder = (e) =>{
        e.preventDefault(); 

        if(this.state.selectedId !== ""){
            this.props.deleteOrder({...this.state.selectedOrder, orderLines: this.state.orderLines})
        } else {
            window.alert("Vælg venligst en ordren, før du sletter den.");
        } 

    }

    getdata=()=> {
       if (this.props.orders) {  
           return this.props.orders.filter(x=> x.ownerRef.id === this.props.auth.uid)
       } else { return [] }
    }

    render() {

        const orderColumns = getColumnsFromArray(["Order Id", "Owner Name", "Date"]);
        const orderLineColumns = getColumnsFromArray(["Product Name", "Amount"])

        return(
            <div className="PageStyle">
            
            <div class="container">
           
            <div className="PageStyle customText_b">
            <p className="h2">Ordrer:</p></div>
            
            
     
            <div class="row">
              <div class="col">
              <ReactTable 
                            data={this.getdata()}
                            className="productTable -striped -highlight"
                            columns={orderColumns}
                            showPagination={false} 
                            className=" -striped -highlight darkenReactTable"
                            getTrProps={(state, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                    return {
                                        onClick: (e) => {
                                        this.setStateAsSelected(rowInfo);
                                        this.showOrderLines(rowInfo);
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
                        />
              </div>
              <div class="col">
              <ViewTable 
                    data={this.state.orderLines ? this.state.orderLines : []} 
                    columns={orderLineColumns}></ViewTable>
             </div>
           </div></div>
           
           <div className="row">
               <div className="col"><Link to="/User/Order/Select" className="btn green_BTN btn-block">Create new order</Link>
                       </div>
               <div className="col"><button onClick={this.deleteOrder} className="btn red_BTN btn-block">Remove order</button>
         </div>
           </div>
           <div className="frameBordering">
                         </div> 
           </div>
         
                       
                  
             
        );
    }
}


const mapStateToProps = state => {
           
    return {
        orders: state.firestore.ordered.orders,
        products: state.firestore.ordered.products,
        auth: state.firebase.auth,
        selectedOrder: state.orderReducer.selectedOrder,
        users: state.firestore.ordered.users
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteOrder: (id) => dispatch(deleteOrderAction(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect(
        [
            {collection: 'orders'},
            {collection: 'products'}
        ]))(UserOrder)