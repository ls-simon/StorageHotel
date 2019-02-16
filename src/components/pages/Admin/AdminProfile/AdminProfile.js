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
            userName: "",
            nickName: "",
            userType: props.userType,
            userId: props.userId,
            employees: [],
            selected: [],
            selectedId: ""
        };
    }
   
    componentDidMount() {
    }

    setLoggedInUserData() {
    
        const loggedInUser = this.state.employees.filter(employee => employee.hexId == this.props.userId);
        this.setState({userName: loggedInUser[0].userName, nickName: loggedInUser[0].nickname});
    }



    deleteEmployee = (e) => {
        e.preventDefault();

        if (window.confirm("Do you wish to delete this employee from the system?")) {
            
          //Delete action
        } 
    }

    render() {
        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

         const columns = getColumnsFromArray(["Name"]);

        return(
            <div className="PageStyle customText_b"> 
                <h1 className="title customText_b_big">Profile information</h1>
                <div className="informationBox">
                    <h1 className="lead"><strong>Other employees: {this.state.userName}</strong></h1>
                    <ReactTable
                        data={this.props.users} 
                        columns={columns} 
                        showPagination={false} 
                        className="-striped -highlight"
                        getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                                return {
                                    onClick: (e) => {
                                        
                                    this.setState({selected: rowInfo.index, selectedId: rowInfo.original.id })
                                    },
                                    style: {
                                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                    }
                                }
                                }else{
                                return {}
                                }
                            }}
                        style={{height: "50vh"}}
                    />
                   
                    <Link to="/Admin/Profile/AddEmployee" className="green_BTN btn my-2 mx-2">Add employee</Link>
                    <div className="red_BTN btn my-2 mx-2" onClick={this.deleteEmployee}>Remove employee</div>
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
            {collection: 'users', where: ['customer', '==', false]}
        ]))(AdminProfile)