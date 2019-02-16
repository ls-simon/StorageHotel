import React from 'react';
import ReactTable from 'react-table';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import "../../Pages.css";
import "./UserStock.css";
import {get} from './../../../../handlers/requestHandlers.js';
import {makeProductsData, makeCustomerProductsData} from './../../../../handlers/dataHandlers.js';
import { getColumnsFromArray } from '../../../../handlers/columnsHandlers';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

class UserStock extends React.Component {  
    
    constructor(props) {
        super(props);

        this.state = {
            quarry: "",
            products: [],
            selected: null,
            selectedId: ""
        };
    }


    makeProducts() {

        if (this.props.products !== undefined) {
        
            const userType = this.props.profile.userType;
            const id = this.props.userId;

            console.log(this.props.products);
            console.log(this.props.users);
        
        if (this.props.userType === "publisher") {
            this.makeProductsFromPublisher()
        } 
        if (this.props.userType === "client") {
            return this.props.products.filter(x=> { return x.ownerId === id});    
        }
        
        return this.props.products;

        } else {
            return undefined;
        }

        
    }

    makeProductsFromPublisher() {
       const uid = this.props.userId;
       const users = this.props.users;
       let products = [];

       let clientsOfPublisher = users.filter(user => {
            if (user.publisher) {
                return user.publisher;
            }
       });

       clientsOfPublisher.forEach(userId => {
           this.props.products.forEach(product => {
               if (product.ownerId === userId || product.ownerId === uid) {
                    products.push(product);
               }
           })
       })
       console.log("products :  " + products)
       return products;
    }

    makeUsers() {
        return "";
    }

    render(){

        if(!this.props.auth.uid || this.props.profile.userType === "employee"){
            return <Redirect to="/"/>
        }

        const columns = getColumnsFromArray(["Product Id", "Product Name", "Quantity", "Owner"]);
        const products = this.makeProducts();
        console.log("PRODUCTS "+JSON.stringify(products));
        return(
            <div className="PageStyle customText_b">
                <div className="frameBordering">
                    <h1 className="customText_b_big">Your Stock</h1>
                    <div className="row">
                        <div className="col">
                            <div className="reacttable">
                            <ReactTable
                                    columns={columns}
                                    data={[]}
                                    showPagination={false} 
                                    className="-striped -highlight"
                                    defaultPageSize={25}
                                    style={{
                                        height: "400px"                                      
                                    }}
                                />  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    console.log(state)
    return{
        auth: state.firebase.auth,
        userId: state.firebase.auth.uid,
        profile: state.firebase.profile,
        products: state.firestore.ordered.products,
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:"products"}, {collection: "users"}
]))(UserStock)