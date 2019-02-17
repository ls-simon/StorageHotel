import React,{Component} from 'react'
import {connect} from 'react-redux'
import { deleteProductAction, updateProductAction } from '../../redux/actions/productActions';
import {entireStockPDF} from './../../handlers/pdfHandlers'

import { withRouter } from "react-router-dom";

class AdminStockButtonList extends Component {

    constructor(props) {
        super(props);
    }
   
    changeToEditPage = (e) =>{
        e.preventDefault();

        const {selectedProduct} = this.props
        let id
        selectedProduct ? id = selectedProduct.id : id = null
        
        if (id) {
            
            this.props.history.push('/Admin/Stock/Edit/'+id)
         
            
        } else { 
                alert("Vælg først et produkt at redigere.")
            }  
        } 
   
    addProductToStock = () => {this.props.history.push("/Admin/Stock/New")}


    deleteProduct = (e) => {
        e.preventDefault();

        const {selectedProduct} = this.props
        let id
        selectedProduct ? id = selectedProduct.id : id = null
        
        if (id) {
            if (window.confirm("Er du sikker på, du vil slette produktet?")) {
               this.props.destroyProduct(id)
            } else { 
                alert("Vælg først et produkt at slette.")
            }  
        } 
    }

    render() {
       
     
        
        return(
            <div className="CRUD container row">
            <div className="">
                <button  className="green_BTN stockBTNSizer btn my-2" onClick={this.addProductToStock}>New</button>
            </div>

            <div action="/Admin/Stock/Edit" className="">
                <button  className="yellow_BTN stockBTNSizer btn my-2" onClick={this.changeToEditPage} >Edit</button>
            </div>
           
            <div action="/Admin/Stock/Remove" className="">
                <button  className="red_BTN stockBTNSizer btn my-2" onClick={this.deleteProduct}>Remove</button>
            </div>

            <button onClick={()=>entireStockPDF(this.state)} className="std_BTN stockBTNSizer btn my-2">Export</button>
        </div>
        )
    }


}



const mapStateToProps = (state) => {
    console.log(state);
    
    return {
        selectedProduct: state.productReducer.selectedProduct
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        destroyProduct: (id) => dispatch(deleteProductAction(id))
       
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminStockButtonList))