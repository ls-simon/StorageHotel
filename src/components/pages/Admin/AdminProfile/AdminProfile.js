import React,{Component} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from 'react-redux-firebase';
import ReactTable from 'react-table';
import {Link, Redirect} from "react-router-dom";

import "../../Pages.css";
import "./AdminProfile.css";
import { getColumnsFromArray } from '../../../../handlers/columnsHandlers.js';

class AdminProfile extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
        };
    }
    
    
    getCurrentUserInfo() {
        console.log(this.props.auth);
        
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
                <ReactTable
                data={this.props.users} 
                columns={columns} 
                showPagination={false} 
                className="-striped -highlight"
                style={{height: "50vh"}}
                />
                
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