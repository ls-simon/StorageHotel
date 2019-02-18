import React,{Component} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from 'react-redux-firebase';

import {Link, Redirect} from "react-router-dom";

import "../../Pages.css";
import "./AdminProfile.css";
import { getColumnsFromArray } from '../../../../handlers/columnsHandlers.js';
import ViewTable from './../../../ReactTables/ViewTable'

class AdminProfile extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
        };
    }
    
    
    getCurrentUserInfo() {
        
        const currentUser = this.props.users.filter(x => x.id == this.props.auth.uid)[0];
        return currentUser
    }
    
    
    render() {
        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }
        if (this.props.users) {
            
            const columns = getColumnsFromArray(["Name"]);
            
            return(
                <div className="PageStyle customText_b"> 
                <div className="container">
                <h1 className="title customText_b_big">Din email</h1>
                <div className="center-text">{this.props.auth.email}</div>
             </div>
                <div className="informationBox">
                <h1 className="lead"><strong>Medarbejdere:</strong></h1>
                <ViewTable data={this.props.users} columns={columns}/>
                
                
                <Link to="/Admin/Profile/AddEmployee" className="green_BTN btn my-2 mx-2">Ny medarbejder</Link>
                </div>
                </div>
                );
            } else { return (<h1>Vent venligst..</h1>)
                
            }
        }
    }
    
    const mapStateToProps = (state) =>{
        
        return{
            users: state.firestore.ordered.users,
            auth: state.firebase.auth
        }
    }
    
    
    export default compose(
        connect(mapStateToProps, null), 
        firestoreConnect(
            [
                {collection: 'users', where: ['customer', '==', false]}
            ]))(AdminProfile)