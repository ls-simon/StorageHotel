import React from 'react';
import "./Order.css";
import ReactTable from 'react-table';
import {connect} from "react-redux";
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";

import {itemPreviouslyAddedWarning, userNotFoundWarning, amountIsNotANumberWarning, 
    amountExceedingQuantityWarning, amountIsZeroWarning, itemNotChosenWarning, 
    customerIsNotSelectedWarning} from '../../../handlers/exceptions.js';
    import { getColumnsFromArray } from '../../../handlers/columnsHandlers.js';
    import NavBarOrderSelect from '../NavBars/NavBarOrderSelect';
    
    
    
    //TODO: Render warning in previouslyAddedWarning
    //TODO: Put items in cart notification symbol on cart button
    //TODO: Make downsliding text saying "Added to cart" and "Removed from cart"
    //TODO: Fix textfield in row errors
    //TODO: Properly pass orderLines in state as props to UserOrderCart child
    
    class UserOrder extends React.Component {
        
        constructor(props) {
            super(props);
            
            this.state = {
                userID: props.userId,
                userType: props.userType,
                products: [],
                selected: null,
                selectedId: "",
                orderLines: [],
                customers:[],
                customerId:"",
                userSelectedType:"",
                numberOfItems:0,
                filteredStock: []
            };
            
            this.addSelectedToOrderLine = this.addSelectedToOrderLine.bind(this);
            this.undoOrderLine = this.undoOrderLine.bind(this);
            this.renderEditable = this.renderEditable.bind(this);
        }
        
        
        componentWillReceiveProps(props) {
            this.filterStock(props)   
        }
        
        filterStock(props) {
            let uid = props.auth.uid;
            let {products, customers, history} = props
            delete products.ownerRef
            delete products.created
            let userType = props.profile.userType
            let filteredStock = [];
            
            
            switch(userType) {
                case 'employee':
                filteredStock = products
                break;
                case 'client':
                filteredStock = this.fetchUserSpecificProducts(uid)
                break;
                case 'publisher':
                filteredStock = this.fetchUserSpecificProducts(uid)
                filteredStock.push(this.fetchClientsProducts(uid, customers, products))
                break;
                default:
                window.alert("Error in fething user information")
                history.push('/')
                break;  
            } 
            this.setState({filteredStock: filteredStock})
        }
        
        fetchAllProducts = () => {
            return this.props.products
        }
        fetchUserSpecificProducts(uid) {
            return this.props.products.filter(x=>x.ownerRef.id===uid);
        }
        fetchClientsProducts = (uid, customers, products) => {
            let clientsProducts = []
            const clients = customers.filter((x)=> x.userType.toLowerCase() == 'client')
            const currentPublishersClients = clients.filter((x) => x.publisher.include(uid))
            currentPublishersClients.forEach((client) => {
                clientsProducts = products.filter((x) => x.ownerRef.include(client.id))
                return clientsProducts
            }) 
        }
        
        constructNewOrderline(p) {
            return {
                amount: this.state.selectedAmount,
                product: {
                    id: p.id,
                    productId: p.productId,
                    productName: p.productName,
                    quantity: p.quantity
                }
            }
            
        }
        
        addSelectedToOrderLine = () => {
            
            const {filteredStock, orderLines, numberOfItems, selectedId} = this.state
            
            if(selectedId) {
                let productToAdd = [...filteredStock].filter(p => p.id === selectedId)[0]
                
                const newLine = this.constructNewOrderline(productToAdd)
                
                if (orderLines.some(orderLine => orderLine.product.id === newLine.product.id)) {
                    itemPreviouslyAddedWarning();
                } else {
                    if (newLine.amount !== 0) {
                        
                        this.setState({orderLines: [...orderLines, newLine], numberOfItems: numberOfItems+1}); 
                        
                    } else {
                        amountIsZeroWarning();
                    }
                }
            } else { 
                itemNotChosenWarning();
            }
        }
        
        undoOrderLine = () => {
            
            if(this.state.numberOfItems===0){
                alert("Cart is currently empty")
            } else {
                this.setState({orderLines: this.state.orderLines.splice(-1, 1),numberOfItems:this.state.numberOfItems-1})
            }
        }
        
        //Not in use - should be in second if in addSelectedToOrderLine
        checkIfPreviouslyAdded = (orderLine) => {
            
            if(this.state.orderLines.filter(line => orderLine.id === line.id)) {
                itemPreviouslyAddedWarning(); 
            }
        }
        
        
        renderEditable = cellInfo => {
            return (
                <input
                type="number"
                name="amount"
                onChange={(e)=>{this.setState({selectedAmount: e.target.value})
            }}
            />
            )
        }
        
        
        render() {
            
            if(!this.props.auth.uid){
                return <Redirect to="/"/>
            }
            if (this.props.products && this.props.customers) {
                
                const columns = getColumnsFromArray([
                    "Product Id", 
                    "Product Name", 
                    "Amount", 
                    "Quantity", 
                    "Owner Name"]);
                    columns[2].Cell = this.renderEditable;
                    
                    return(
                        <div className="PageStyle customText_b">
                        <div className="frameBordering">
                        <nav className="navbar navbar-light bg-light"> 
                        <NavBarOrderSelect orderLines={this.state.orderLines} userType={this.props.profile.userType} customers={this.props.customers}/>
                        <h2 className=" customText_b_big "> Vælg produkter:</h2>
                        </nav> 
                        
                        <div className="table">
                        <div className="SideBar col rounded">
                        <div className="col-my-auto">
                        
                        <div className="OrderList">
                        <ReactTable  
                        data={this.state.filteredStock ? this.state.filteredStock : []} 
                        columns={columns} 
                        showPagination={false} 
                        className="-striped -highlight"
                        getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                                return {
                                    onClick: () => {
                                        this.setState({selected: rowInfo.index, selectedId: rowInfo.original.id })
                                    },
                                    style: {
                                        background: rowInfo.index === this.state.selected ? '#00afec' : 'white'
                                    }
                                }
                            }else{
                                return {}
                            }
                        }}
                        defaultPageSize={25}
                        style={{
                            height: "400px"                                      
                        }}
                        />
                        
                        </div>
                        </div>  
                        </div>  
                        <nav className="navbarToButtoms navbar-light bg-light"> 
                        <div className="container row">
                        <div className="col my-2">
                        <button type="button" className="green_BTN btn-lg btn-block btn my-2" onClick={this.addSelectedToOrderLine}>Add to order</button>
                        </div>
                        <div className="col my-2 form-inline">
                        <button type="button" className="yellow_BTN btn-lg btn-block btn my-2" onClick={this.undoOrderLine}>Undo</button>
                        </div>
                        <nav className="navbar navbar-light bg-light">                   	
                        
                        </nav> 
                        </div>
                        </nav>      
                        </div>
                        </div>
                        </div>
                        );
                    } else { return (<h1>Vent venligst...</h1>)}
                    
                }
            }
            
            
            
            const mapStateToProps = (state) => {
                return {
                    auth: state.firebase.auth,
                    profile: state.firebase.profile,
                    userType: state.firebase.profile.userType, 
                    userId: state.loginReducer.userId,
                    products: state.firestore.ordered.products,
                    customers: state.firestore.ordered.users 
                }
            }
            
            
            
            export default withRouter(compose(
                connect(mapStateToProps, null), 
                firestoreConnect(
                    [
                        {collection: 'products'},
                        {collection: 'users', where: ['customer', '==', true]}
                    ]))(UserOrder))
                    
                    
                    
                    
                    