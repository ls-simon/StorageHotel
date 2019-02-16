import React from 'react';
import "./Order.css";
import ReactTable from 'react-table';
import { connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {makeProductsData} from '../../../handlers/dataHandlers.js';
import {itemPreviouslyAddedWarning, userNotFoundWarning, amountIsNotANumberWarning, 
        amountExceedingQuantityWarning, amountIsZeroWarning, itemNotChosenWarning, 
        customerIsNotSelectedWarning} from '../../../handlers/exceptions.js';
import { getColumnsFromArray } from '../../../handlers/columnsHandlers.js';
import { get } from '../../../handlers/requestHandlers';
import Dropdown from "../../MenuComponents/Dropdown/Dropdown";
import {makeCustomerData} from "../../../handlers/dataHandlers";

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

    componentDidMount() {

        this.getClients();
        this.getPublishers();
        this.getStock();           
    }

     getClients() {

         get('employee/clients', (data) => {
             const clients = makeCustomerData(data);
             this.concatinateWithNewData(clients);
         });
     }
 
     getPublishers() {

        get('employee/publishers', (data) => { 
            const publishers = makeCustomerData(data);
            this.concatinateWithNewData(publishers);
         });
     }
 
     concatinateWithNewData(newData) {

         const customersCopy = this.state.customers;
         let concatinatedData = customersCopy.concat(newData);
         this.setState({ customers: concatinatedData });
     }

    getStock() {

        const userType = this.props.userType.toLowerCase();
        const id = this.props.userId;

        if(userType==="employee"){
            get('employee/products', (data) => {
                const products = makeProductsData(data);
                this.setState({products: products})
            })

        } else {

            get(userType + 's/' + id + '/products', (data) => {
                let products = [];
                if (data == null) {
                    userNotFoundWarning();
                } else {
                    products = makeProductsData(data);
                    this.setState({ products: products });
                }
            });
        }
    }

    addSelectedToOrderLine = () => {

        if(this.state.selected!==null){
            let newLine = {}
            let userType = this.state.userType.toLowerCase();

            userType === 'employee' ? newLine = this.state.filteredStock[this.state.selected] : newLine = this.state.products[this.state.selected];

            if (this.state.orderLines.some(orderLine => orderLine.productId === newLine.productId)) {
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

        if(this.state.orderLines.filter(line => orderLine.hexId === line.hexId)) {
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
                    
                    this.state.products
                    .filter(product => 
                        product.hexId === cellInfo.original.hexId)
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
                __html: this.state.products[cellInfo.index][cellInfo.column.id]
                }}
            required/>
        );
    };


    createNavBar = () =>{

        let navbar = null;
        if(this.props.userType==="EMPLOYEE"){
            navbar = (
                <nav className="navbar navbar-light bg-light">                   
                    <form className = "form-inline">
                        <button className="btn std_BTN my-2 my-sm-0" onClick={this.changeToCart}>Go to cart <span class="badge badge-light">{this.state.numberOfItems}</span></button>
                    </form>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span htmlFor="dropdown" className="input-group-text" id="basic-addon1">Create order for:</span>
                        </div>
                        <Dropdown actors={this.state.customers} action={this.setSelectedUser}/>
                    </div>
                </nav> 
                )
        } else {
            navbar = (
                <nav className="navbar navbar-light bg-light">                   
                    <form className = "form-inline">
                        <button className="btn  std_BTN my-2 my-sm-0" onClick={this.changeToCart}>Go to cart <span class="badge badge-light">{this.state.numberOfItems}</span></button>
                    </form>       
                </nav> 
            )
        }

        return navbar;
    }

    setSelectedUser = (e) => {

        if(e.target.value.toLowerCase()!=="choose customer"){    
            this.setState({userSelectedId:e.target.value},()=>{
                this.setState({userSelectedType:this.state.customers.find(x=>x.hexId===this.state.userSelectedId).userType},() => {
                    this.filterStock();
                })
            })
        } else {
            window.alert("That is not a valid user")
        }
    }

    filterStock() {

        let hexId = this.state.userSelectedId;
        let userType = this.state.userSelectedType.toLowerCase();
        let filteredStock = this.state.products.filter(x=>x.ownerHexId===hexId);
        const customer = this.state.customers.filter(x=>x.hexId===hexId)[0];

        if (userType === 'publisher') {
            if (customer.clients !== 'none') {
                customer.clients.forEach((client) => {
                   let clientsProducts = this.state.products.filter(x=>x.ownerHexId===client.hexId);                    
                   filteredStock.push(...clientsProducts);
                }) 
            }
        }

        this.setState({filteredStock: filteredStock})
    }

    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        const data = this.state.products;
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
                        <h2 className=" customText_b_big "> Order:</h2>
                    </nav> 

                    {this.createNavBar()}        
                    
                    <div className="table">
                        <div className="SideBar col rounded">
                            <div className="col-my-auto">
                                    <div className="OrderList">
                                        <ReactTable  
                                        data={this.state.filteredStock ? this.state.filteredStock : data} 
                                        columns={columns} 
                                        showPagination={false} 
                                        className="-striped -highlight"
                                        getTrProps={(state, rowInfo) => {
                                            if (rowInfo && rowInfo.row) {
                                            return {
                                                onClick: () => {
                                                    if (!this.state.filteredStock && this.state.userType.toLowerCase() === 'employee') {
                                                        customerIsNotSelectedWarning();
                                                    } else {
                                                        this.setState({selected: rowInfo.index, selectedId: rowInfo.original.hexId })
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

const mapStateToProps = (state)=>{

    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        userType: state.loginReducer.userType, 
        userId: state.loginReducer.userId
    }
}

const mapDispatchToProps = (dispatch) =>{

    return {
        setItemToCart: (orderLines) => {dispatch({type: "SET_ORDERLINES",payload: {orderLines}})},
        setCustomerToCart: (customer) =>{dispatch({type:"SET_CUSTOMER", payload:{customer}})}
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(UserOrder)


