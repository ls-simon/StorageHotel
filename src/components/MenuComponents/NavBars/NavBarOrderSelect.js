import React,{Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Dropdown from './../Dropdown/Dropdown'
import {attachCustomerToOrderAction, setOrderLinesToCartAction} from './../../../redux/actions/orderActions'
import {customerIsNotSelectedWarning} from './../../../handlers/exceptions'


class NavBarOrderSelect extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            numberOfItems: 0,
            customerType: '',
            customerId: ''

        }
    }
    
    setSelectedCustomer = (e) =>{
       
        const selectedCustomer = e.target.value.split('&')
        const id = selectedCustomer[0]
        const name = selectedCustomer[1]
        
        if (id !== 'Vælg kunde') {
                this.setState({customerId: id, customerName: name})   
        }
    }

    changeToCart = (event) => {
        event.preventDefault();
        const {orderLines, userType, history, mapOrderToProps} = this.props
        const {customerId, customerType, customerName} = this.state
            
        if(orderLines.length !== 0){
            if (userType === "employee"){    
                if (this.isCustomerSelected()){
                    
                    const payload = {
                        orderLines: orderLines, 
                        selectedCustomer: {
                            userType: customerType, 
                            id: customerId,
                            name: customerName
                        }
                    }

                    mapOrderToProps(payload)
                    history.push("/Admin/Order/Cart")

                } else {
                    customerIsNotSelectedWarning();
                }
            } else {
                history.push("/User/Order/Cart")
            }
        } else { 
            window.alert("You need to add something to the cart")
        }        
    }
    
    isCustomerSelected() {
        const {customerId} = this.state
        return customerId && customerId !== ""
    }
    
    createNavBar = () =>{
        
        let navBar = null;
        if(this.props.userType === "employee"){
            navBar = (
                <nav className="navbar navbar-light bg-light">                   
                <form className = "form-inline">
                <button className="btn std_BTN my-2 my-sm-0" onClick={this.changeToCart}>Go to cart <span className="badge badge-light">{this.props.orderLines.length}</span></button>
                </form>
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                <span htmlFor="dropdown" className="input-group-text" id="basic-addon1">Create order for:</span>
                </div>
                <Dropdown actors={this.props.customers} action={this.setSelectedCustomer}/>
                </div>
                </nav> 
                )
            } else {
                navBar = (
                    <nav className="navbar navbar-light bg-light">                   
                    <form className = "form-inline">
                    <button className="btn  std_BTN my-2 my-sm-0" onClick={this.changeToCart}>Go to cart <span className="badge badge-light">{this.props.orderLines.length}</span></button>
                    </form>       
                    </nav> 
                    )
                    
                }
                return navBar 
            }
            
            render() {
                return (
                    <div>{this.createNavBar()}</div>
                    )
                }
            }
            
            const mapDispatchToProps = (dispatch) => {
                
                return {
                    mapOrderToProps: (payload) => {dispatch({type: 'SET_ORDER', payload})},
                    }
            }
            
            export default withRouter(connect(null, mapDispatchToProps)(NavBarOrderSelect))