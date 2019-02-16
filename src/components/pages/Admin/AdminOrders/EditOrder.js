import React,{Component} from 'react';
import ReactTable from 'react-table';
import "../../Pages.css";
import {getColumnsFromArray} from './../../../../handlers/columnsHandlers.js';
import {post, del} from './../../../../handlers/requestHandlers.js';
import {amountIsNotANumberWarning, amountExceedingQuantityWarning} from './../../../../handlers/exceptions.js';
import "./EditOrder.css";
import { connect } from 'react-redux';
import { makeOrderBodyFromData } from '../../../../handlers/bodyHandlers';

class EditOrder extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            orderLines: [],
            stock: [],
            order: {},
            userType: "",
            userHexId: "",
            selectedOrderLine: -1,
            selectedOrderLine: {productName: "Nothing Chosen", productId: "Nothing Chosen",quantity:"Nothing Chosen"}
        }
    }

    componentDidMount() {   

        this.setState({order: this.props.order, orderLines: this.props.order.orderLines});
    }

    onChangeHandler = (e) =>{

        let orderLines = this.state.orderLines;
        orderLines[this.state.selectedOrderLineNumber].amount = e.target.value;
       
        this.setState({orderLines: orderLines});
    }

    addOrderLine = (e) => {
        e.preventDefault();

        let orderLines = this.state.orderLines;
        let newOrderLine = this.state.stock[this.state.selectedProduct];
        this.setState({orderLines : [...orderLines, newOrderLine]});
    }

    removeOrderLine = (e) => {
        e.preventDefault();

        let id = this.state.orderLines[this.state.selectedOrderLine].productId;
    
        let orderLines = this.state.orderLines.filter(orderLine => {
           return  orderLine.productId !== id
            });

       this.setState({orderLines : orderLines})
    }

    rowIsRemoved() {

        return this.state.orderLines[this.state.selectedOrderLine] ? false : true;
    }

    sendToPage = (address) => {this.props.history.push(address);}

    renderEditable = (cellInfo) => {

        //renderEditable complains if a row with a Cell property is being removed
        if (!this.rowIsRemoved()) { 
            return (
                <div
                    style={{ backgroundColor: "#fafafa", color: 'black'}}
                    contentEditable
                    type="number"
                    
                    onBlur={e => {
                    
                        var typedAmount = e.target.innerHTML ? e.target.innerHTML : "0";
                        if (!typedAmount.match(/^\d+$/)) { amountIsNotANumberWarning() }
                        this.state.orderLines
                        .filter(orderLine => orderLine.hexId === cellInfo.original.hexId)
                        .map(orderLine => {
                            if (typedAmount <= orderLine.quantity) { 
                                typedAmount = orderLine.amount ;
                            } else { 
                                amountExceedingQuantityWarning();
                                typedAmount = "0";
                            }
                                
                        })
                            typedAmount = cellInfo.original.amount ;
                            typedAmount =   e.target.innerHTML;
                        
                    }}
                    dangerouslySetInnerHTML={{
                        __html: this.state.orderLines[cellInfo.index][cellInfo.column.id]
                    }}
                required/>
            );
        } 
    }

     
    updateOrder = (e) => {
        e.preventDefault();

        const data = makeOrderBodyFromData(this.state.orderLines, this.state.order);
        
        del("orders/delete/"+this.props.match.params.id, (response) => {
        
            const userId = this.state.order.ownerHexId;
            const userType = this.state.order.ownerType.toLowerCase();

            post("orders/"+userId+"/"+userType, data, (response) => {
                if (window.confirm("Address successfully updated!", response)) {
                    this.props.history.push("/Admin/Orders");
                }
            })
        });
        
    }

    onEditAddress = (e) => {
        e.preventDefault();  

        this.props.history.push("/Admin/Orders/Edit/OrderAddress/"+this.state.order.hexId);
    }

    render() {

        let orderLineColumns = getColumnsFromArray(["Product Name", "Product Id", "Amount", "Quantity"]);
        
        return (
            <div className="PageStyle customText_b">
                <div className="frameBordering">
                    <div className="EditOrderLeft">
                        <ReactTable 
                            data={this.state.order.orderLines}
                            columns={orderLineColumns}
                            showPagination={false}
                            className="editOrderColor -striped -highlight"
                            getTrProps={(state, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                    return {
                                    onClick: (e) => {    
                                        this.setState({selectedOrderLine: rowInfo.original, selectedOrderLineNumber:rowInfo.index});
                                    },
                                    style: {
                                        background: rowInfo.index === this.state.selectedOrderLineNumber ? '#00afec' : 'white',
                                    
                                        
                                    }
                                }
                                }else{
                                    return {}
                                }
                            }}
                            style={{height: "70vh"}}
                        />   
                    </div>

                    <div className="EditOrderRight">
                        <form onSubmit={this.updateOrder}>
                            <div className="EditOrderTextFields">        
                                <div className="input-group my-2">
                                    <div className="input-group-prepend">
                                        <label className="input-group-text" htmlFor="name" id="Item">Name</label> 
                                    </div>
                                    <label id="name" className="input-group-text" type="text" name="name">{this.state.selectedOrderLine.productName} </label>
                                </div>

                                <div className="input-group my-2">
                                    <div className="input-group-prepend">
                                        <label className="input-group-text" htmlFor="id" id="Item2">Product Id</label> 
                                    </div>
                                    <label id="id" className="input-group-text" type="text" name="id" >{this.state.selectedOrderLine.productId} </label>
                                </div>

                                <div className="input-group my-2">
                                    <div className="input-group-prepend">
                                        <label className="input-group-text" htmlFor="amount" id="Item3">Amount</label> 
                                    </div>
                                    <input id="amount" className="form-control" type="number" name="amount" onChange={this.onChangeHandler} defaultValue={this.state.selectedOrderLine.amount} placeholder="Amount ordered" required/>
                                </div>

                                <div className="input-group my-2">
                                    <div className="input-group-prepend">
                                        <label className="input-group-text" htmlFor="name" id="Item">Quantity in Stock: </label> 
                                    </div>
                                    <label id="name" className="input-group-text" type="text"> {this.state.selectedOrderLine.quantity}</label>
                                </div>
                            </div>
                            <div className="EditOrderRightBTNs">
                                <button className="btn AdinOrderButtonSizer std_BTN btn-lg mx-2" onClick={this.onEditAddress}>Edit address</button>        
                                <button className="col btn AdinOrderButtonSizer yellow_BTN mx-2" type="submit" onClick={this.updateOrder}>Save content</button>
                                <button className="col btn AdinOrderButtonSizer std_BTN mx-2" onClick={()=>this.sendToPage("/Admin/Orders")}>Back</button>      
                            </div>   
                        </form>              
                    </div>
                </div>       
            </div>                        
        )
    }
}

const mapStateToProps = (state) => {

    return  {order: state.orderReducer.selectedOrder }
}

export default connect(mapStateToProps)(EditOrder)