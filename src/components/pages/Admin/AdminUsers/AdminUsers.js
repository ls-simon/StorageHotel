import React,{Component} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from 'react-redux-firebase';
import ReactTable from 'react-table';

import "./AdminUsers.css";
import {Link, Redirect} from "react-router-dom";
import {getColumnsFromArray} from "./../../../../handlers/columnsHandlers.js"




class AdminUsers extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            selectedCustomer: {contactInformation: {}},
            selected: null,
            selectedId: null,
            changed:{}
        };
    }

    componentDidMount() {
    }

    onChange = (e) => {
        
        this.setState({...this.state,changed:{...this.state.changed,[e.target.name]:e.target.value}});
    }

    onSubmit = () => { }
 
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
                                            
                                            this.setState({ selected: rowInfo.index, selectedCustomer: rowInfo.original })
                                        
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
                                                    Nickname
                                                </label>
                                            </div>
                                                 <input
                                                    onChange={this.onChange}
                                                    id="nickName" 
                                                    className="form-control" 
                                                    type="text"
                                                    defaultValue={selectedCustomer.name}
                                                    name="nickName"                                        
                                                    required/>
                                        </div>
                                
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <label htmlFor="email" 
                                                    className="input-group-text" 
                                                    id="emailLabel">
                                                    Email
                                                </label>
                                            </div>
                                            <input
                                                onChange={this.onChange}
                                                id="email" 
                                                className="form-control" 
                                                type="email"
                                                defaultValue={selectedCustomer.contactInformation.email}
                                                name="email"                                        
                                                required />
                                        </div>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <label htmlFor="phone" 
                                                    className="input-group-text" 
                                                    id="phoneLabel">
                                                    Phone Number
                                                </label>
                                            </div>
                                            <input
                                                onChange={this.onChange}
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
                                                    Address
                                                </label>
                                            </div>
                                            <input
                                                onChange={this.onChange}
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
                                                    City
                                                </label>
                                            </div>
                                            <input
                                                onChange={this.onChange}
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
                                                    Zipcode
                                                </label>
                                            </div>
                                            <input
                                                onChange={this.onChange}
                                                id="zipCode" 
                                                className="form-control" 
                                                type="number"
                                                defaultValue={selectedCustomer.contactInformation.zipCode}
                                                name="zipCode"                                        
                                                required/>
                                        </div>
                                        
                                                
                                        <div className="container row">
                                    <div className="col my-2">
                                        <Link to="/Admin/Users/Create" className="btn adminUserBtn green_BTN">Create new user</Link>
                                    </div>
                                    <div className="col my-2">

                                        <button type="submit" className="btn adminUserBtn yellow_BTN">Confirm edit</button>
                                    </div>
                                    <div className="col my-2">
                                        <button type="button" onClick={this.onDelete} className="btn adminUserBtn red_BTN">Delete this user</button>
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
    console.log(state.firestore.ordered.users);
    
    return{
        users: state.firestore.ordered.users,
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
            {collection: 'users', where: ['customer', '==', true]}
        ]))(AdminUsers)