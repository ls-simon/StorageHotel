import React,{Component} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from 'react-redux-firebase';
import ReactTable from 'react-table';

import "./AdminUsers.css";
import {Link, Redirect} from "react-router-dom";
import {getColumnsFromArray} from "./../../../../handlers/columnsHandlers.js"
import {updateCustomerAction} from "./../../../../redux/actions/userActions"



class AdminUsers extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            selectedCustomer: {contactInformation: {}},
            selectedCustomerId: '',
            selected: null,
            editedCustomer:{},
            contactInformation: {}
        };
    }

    componentDidMount() {
    }

    onChange = (e) => {
        
        this.setState({...this.state,editedCustomer:{...this.state.editedCustomer,[e.target.name]:e.target.value}});
    }
    
    onChangeCI = (e) => {
        this.setState({...this.state,contactInformation:{...this.state.contactInformation,[e.target.name]:e.target.value}});
    }

    onSubmit = (e) => { 
        e.preventDefault()

        let payload = {
           customer: this.state.editedCustomer,
        contactInformation: this.state.contactInformation,
        id : this.state.selectedCustomerId
        }
        
        this.props.updateCustomer(payload)
        window.alert("Kunde opdateret!")
    }
 
    onDelete = () => {  
    }

    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        let selectedCustomer = this.state.selectedCustomer
        let columns = getColumnsFromArray(["Name", "User Type"]);

        return(
            <div className="PageStyle customText_b">
                <div className="frameBordering userPageStyle">
                    <div className="container row">
                        <div className="SelectionBar col sidebar">
                            <div className="border border-light  bg-info">
                                <ReactTable 
                                data={this.props.users}
                                columns={columns} 
                                showPagination={false} 
                                className="noBlueTable -striped -highlight" 
                                getTrProps={(state, rowInfo) => {
                                    if (rowInfo && rowInfo.row) {
                                    return {
                                        onClick: (e) => {
                                            e.preventDefault()
                                            
                                            this.setState({ selected: rowInfo.index, selectedCustomer: rowInfo.original, selectedCustomerId: rowInfo.original.id})
                                        
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
                            />
                            </div>
                        </div>
                     
                        <div className="ContentBar  col-sm text-center">
                           <div className="container col">
                                <div className="container col">
                                    <div className="row">

                                    <form onSubmit={this.onSubmit}>   
                                        <div className="input-group mt-3 mb-2">
                                            <div className="input-group-prepend">
                                                <label htmlFor="nickName" 
                                                    className="input-group-text" 
                                                    id="nickNameLabel">
                                                    Navn
                                                </label>
                                            </div>
                                                 <input
                                                    onChange={this.onChange}
                                                    id="name" 
                                                    className="form-control" 
                                                    type="text"
                                                    defaultValue={this.state.selectedCustomer.name}
                                                    name="name"                                        
                                                    required/>
                                        </div>
                                
                        
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <label htmlFor="phone" 
                                                    className="input-group-text" 
                                                    id="phoneLabel">
                                                    Telefonnummer
                                                </label>
                                            </div>
                                            <input
                                                onChange={this.onChangeCI}
                                                id="phone" 
                                                className="form-control" 
                                                type="number"
                                                defaultValue={selectedCustomer.contactInformation.phoneNumber}
                                                name="phoneNumber"                                        
                                                required/>
                                        </div>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <label htmlFor="address" 
                                                    className="input-group-text" 
                                                    id="addressLabel">
                                                    Adresse
                                                </label>
                                            </div>
                                            <input
                                                onChange={this.onChangeCI}
                                                id="address" 
                                                className="form-control" 
                                                type="text"
                                                defaultValue={selectedCustomer.contactInformation.address}
                                                name="address"                                        
                                                required/>
                                        </div>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <label htmlFor="city" 
                                                    className="input-group-text" 
                                                    id="cityLabel">
                                                    By
                                                </label>
                                            </div>
                                            <input
                                                onChange={this.onChangeCI}
                                                id="city" 
                                                className="form-control" 
                                                type="text"
                                                defaultValue = {selectedCustomer.contactInformation.city}
                                                name="city"                                        
                                                required/>
                                        </div>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <label htmlFor="zipCode" 
                                                    className="input-group-text" 
                                                    id="zipLabel">
                                                    Postnummer
                                                </label>
                                            </div>
                                            <input
                                                onChange={this.onChangCI}
                                                id="zipCode" 
                                                className="form-control" 
                                                type="number"
                                                defaultValue={selectedCustomer.contactInformation.zipCode}
                                                name="zipCode"                                        
                                                required/>
                                        </div>
                                        
                                                
                                        <div className="container row">
                                    <div className="col my-2">
                                        <Link to="/Admin/Users/Create" className="btn adminUserBtn green_BTN">Opret ny kunde</Link>
                                    </div>
                                    <div className="col my-2">

                                        <button type="submit" className="btn adminUserBtn yellow_BTN">Bekræft ændringer</button>
                                    </div>
                                    
                                   
                                </div>
                                        </form>
                                    </div>
                                
                                </div>
                                
                                
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    
    return{
        users: state.firestore.ordered.users,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCustomer: (payload) => dispatch(updateCustomerAction(payload))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect(
        [
            {collection: 'users', where: ['customer', '==', true]}
        ]))(AdminUsers)