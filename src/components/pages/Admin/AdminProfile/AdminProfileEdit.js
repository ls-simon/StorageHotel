import React from 'react';
import "../../Pages.css";
import "./AdminProfile.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {put, get} from './../../../../handlers/requestHandlers.js'
import {employeeProfileFieldsAreValidated} from './../../../../handlers/fieldsValidator.js';

//TODO: Passwords has to match

class AdminProfileEdit extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userId: this.props.userId,
            nickName: "",
            userName: "",
            passwordRepeat: "",
            password: ""
        };
    }

    componentDidMount() {this.getEmployeeData();}

    getEmployeeData() {

        get("employee/employee/" + this.props.match.params.id, (data) => {
            this.setState({
                nickName: data.nickname,
                userName: data.userName });
        });
    }

    confirmed = (event) =>{
        event.preventDefault();

        const fields = this.state;
    
        if (employeeProfileFieldsAreValidated(fields)) {
            const body = this.makeBody();

            put("employee/edit/" + this.props.match.params.id, body, (res)=>{
                this.props.history.push("/Admin/Profile")
            });
        }
    }

    makeBody() {

        let body = {};
        body.userName = this.state.userName;
        body.nickname = this.state.nickName;

        if (this.passwordSet()) {
            body.password = this.state.password;
        } 
        return body;
    }

    passwordSet() {return this.state.password && this.state.passwordRepeat;}

    onChange = (e) => {this.setState({[e.target.name]: e.target.value});}
    
    render(){

        if(!this.props.auth.uid){
            return <Redirect to="/"/>
        }

        return(
            <div className="PageStyle customText_b">
                <h1 className="text-center">Edit profile:</h1>
                <div className="row">
                    <div className ="col-md-4 offset-md-4">
                        <form>
                            <input 
                                type="text" 
                                name="userName"
                                className="my-2 form-control"
                                defaultValue={this.state.userName} 
                                onChange={this.onChange}
                                placeholder="Name"/>

                            <input 
                                type="text" 
                                name="nickName"
                                className="my-2 form-control"
                                defaultValue={this.state.nickName} 
                                onChange={this.onChange}
                                placeholder="Name"/>
                                
                            <input
                                type="password" 
                                name="password"
                                className="my-2 form-control"
                                onChange={this.onChange}
                                placeholder="New password"/>
                                
                            <input
                                type="password" 
                                name="passwordRepeat"
                                className="my-2 form-control" 
                                onChange={this.onChange}
                                placeholder="New password repeat"/>      
                        </form>

                        <form className="newForm stockForm">
                            <button className="yellow_BTN btn-lg btn-block btn my-2" onClick={this.confirmed}>Save profile</button>
                        </form>
                        <Link to="/Admin/Profile" className="std_BTN btn-lg btn-block btn my-2">Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}   
    
const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth,
        userId: state.loginReducer.userId
    }
}

export default connect(mapStateToProps)(AdminProfileEdit)