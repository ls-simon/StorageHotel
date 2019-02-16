import React from 'react';
import {Link} from "react-router-dom";
import ReactTable from 'react-table';
import "./UserOrder.css";
import {connect} from "react-redux";
import {get, del} from "./../../../../handlers/requestHandlers.js";
import {makeDataFromOrderList, makePublisherAndItsClientsOrdersData} from '../../../../handlers/dataHandlers.js';
import {getColumnsFromArray} from './../../../../handlers/columnsHandlers.js';

class UserOrder extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { orders: [], selectedOrder: [], selected: null, selectedId: "" };
    }
    
    componentDidMount() {
        
        this.checkUserType();
    }

    checkUserType() {
        console.log("userType", this.props.userType)
        if (this.props.userType.toLowerCase() === 'publisher') {
            this.getPublisherData();
        } else {
            this.getClientData();
        }
    }

    getPublisherData() {

        get("publishers/"+this.props.userId, (data) => {
            const orders = makePublisherAndItsClientsOrdersData(data);
            this.setState({orders: orders})
        });
    }

    getClientData() {

        get("clients/"+this.props.userId+"/orders", (data) => {
            
            const orders = makeDataFromOrderList(data);
            this.setState({orders: orders})
        });
    }


    setStateAsSelected = (rowInfo) => {

        this.setState({selected: rowInfo.index, selectedId: rowInfo.original.hexId });
    }

    showOrderLines(rowInfo) {

        const selectedOrder = this.state.orders[rowInfo.index].orderLines;
        this.setState({seletedOrder: selectedOrder});
    }

    deleteOrder = (e) =>{
        e.preventDefault();

        if(this.state.selectedId !== ""){
            del("orders/delete/"+this.state.selectedId,()=>{
                let newOrders = this.state.orders.filter(x=>x.hexId!==this.state.selectedId)
                this.setState({orders:newOrders})
        
            })
        } else {
         
            window.alert("Please select something");
        }

    }

    render() {

        const orderColumns = getColumnsFromArray(["Order Id", "Owner", "Date"]);
  
        return(
            <div className="PageStyle">
                <div className="frameBordering">
                    <div className="UserOrderLeft">
                        <ReactTable 
                            data={this.state.orders}
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
                    <div className="UserOrderRight">
                        <Link to="/User/Order/Select" className="btn green_BTN btn-block">Create new order</Link>
                        <button onClick={this.deleteOrder} className="btn red_BTN btn-block">Remove order</button>
                  </div>
                </div>    
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        userId: state.loginReducer.userId,
        userType: state.loginReducer.userType
    }
}

export default connect(mapStateToProps)(UserOrder);