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
            userSelectedId:"",
            userSelectedType:"",
            numberOfItems:0,
            filteredStock: null
        };

        this.addSelectedToOrderLine = this.addSelectedToOrderLine.bind(this);
        this.undoOrderLine = this.undoOrderLine.bind(this);
        this.renderEditable = this.renderEditable.bind(this);
    }

 
    componentWillReceiveProps() {
     this.filterStock()   
    }
    
    addSelectedToOrderLine = () => {
       let userType = this.props.profile.userType.toLowerCase()
       let selected = this.state.selected

        if (selected) {
            let newLine = {}
           
             userType === 'employee' ? newLine = this.state.filteredStock[this.state.selected] : newLine = this.props.products[this.state.selected];

            if (this.state.orderLines.some(orderLine => orderLine.product.id === newLine.product.id)) {
            
                itemPreviouslyAddedWarning();
            } else {
            
                if (newLine.amount !== 0) {
                this.setState({orderLines: [...this.state.orderLines, newLine],numberOfItems:this.state.numberOfItems+1}); 
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

    changeToCart = (event) => {
        event.preventDefault();

        if(this.state.orderLines.length !== 0){
            this.props.setItemToCart(this.state.orderLines)
            const userType = this.props.userType
            const {userSelectedId} = this.state
            
            if(userType === "EMPLOYEE"){
                if(userSelectedId!==undefined&&userSelectedId!==null&&userSelectedId!==""){
                    this.props.setCustomerToCart({userType:this.state.userSelectedType,userId:this.state.userSelectedId})
                    this.props.history.push("/Admin/Order/Cart")
                } else {
                    window.alert("Please select a customer you are ordering for.")
                }
            } else {
                this.props.history.push("/User/Order/Cart")
            }
        } else { 
            window.alert("You need to add something to your cart")
        }        
    }

    renderEditable = cellInfo => {

        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                onClick={(e) => {e.target.innerHTML = ""}}
                suppressContentEditableWarning
                type="number"
                onBlur={e => {

                    var typedAmount = e.target.innerHTML ? e.target.innerHTML : "0";
                    if (!typedAmount.match(/^\d+$/)) { amountIsNotANumberWarning(); }
                    
                    this.props.products
                    .filter(product => 
                        product.id === cellInfo.original.id)
                    .map(product => {
                    
                        if (typedAmount <= product.quantity) { 
                            product.amount = typedAmount;
                        } else { 
                            amountExceedingQuantityWarning();
                            typedAmount = "0";
                        }

                    })
                        
                        cellInfo.original.amount = typedAmount;
                        e.target.innerHTML = typedAmount;
                        
                }}
                dangerouslySetInnerHTML={{
                __html: this.props.products[cellInfo.index][cellInfo.column.id]
                }}
            required/>
        );
    };

    filterStock() {

        let uid = this.props.auth.uid;
        let userType = this.props.profile.userType.toLowerCase()
        let filteredStock = [];
        
        switch(userType) {
            case 'employee':
                filteredStock = this.fetchAllProducts(uid);
            case 'client':
                filteredStock = this.fetchUserSpecificProducts(uid)
            case 'publisher':
                filteredStock = this.fetchUserSpecificProducts(uid)
                filteredStock.push(...this.fetchClientsProducts(uid))
            default:
                window.alert("Error in fething user information")
                this.props.history.push('/')
        }
     
        
       this.setState({filteredStock: filteredStock})
    }

    fetchAllProducts = () => {
        return this.props.products
    }

    fetchUserSpecificProducts(uid) {
        return this.props.products.filter(x=>x.ownerRef.id===uid);
    }
    fetchClientsProducts = (uid) => {
        const clients = this.props.users.filter((x)=> x.userType.toLowerCase() == 'client')
        const currentPublishersClients = clients.filter((x) => x.publisher.include(uid))
        currentPublishersClients.forEach((client) => {
        return this.props.products.filter((x) => x.ownerRef.include(client.id))
    }) 
}

    render() {

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }
        if (this.props.products) {
            
        const data = this.props.products;
        const columns = getColumnsFromArray([
            "Product Id", 
            "Product Name", 
            "Amount", 
            "Quantity", 
            "Owner"]);
        columns[2].Cell = this.renderEditable;
        
        return(
            <div className="PageStyle customText_b">
                <div className="frameBordering">
                    <nav className="navbar navbar-light bg-light"> 
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
                                                    if (!this.state.filteredStock && this.props.userType.toLowerCase() === 'employee') {
                                                        customerIsNotSelectedWarning();
                                                    } else {
                                                        this.setState({selected: rowInfo.index, selectedId: rowInfo.original.id })
                                                    }
                    
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
                            </div>
                        </nav>      
                    </div>
                </div>
            </div>
        );
    }

}
}

const mapStateToProps = (state) => {
    
    
    return{

        auth: state.firebase.auth,
        profile: state.firebase.profile,
        userType: state.firebase.profile.userType, 
        userId: state.loginReducer.userId,
        products: state.firestore.ordered.products,
        users: state.firestore.ordered.users 
    }
}

const mapDispatchToProps = (dispatch) =>{

    return {
        setItemToCart: (orderLines) => {dispatch({type: "SET_ORDERLINES",payload: {orderLines}})},
        setCustomerToCart: (customer) =>{dispatch({type:"SET_CUSTOMER", payload:{customer}})}
    }
}

export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect(
        [
            {collection: 'products'},
            {collection: 'users'}
        ]))(UserOrder))

