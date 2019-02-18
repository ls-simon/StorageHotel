const initialState ={};

const productReducer = (state = initialState, action) => {
    
    switch(action.type){
        case "DELETE_ADRESS":
            state ={...state, initialState} 
            break;
        case "UPDATE_PRODUCT_SUCCESS":
            console.log("Product updated!", action);
        case "UPDATE_PRODUCT_ERROR":
            console.log("An error occured while updating product", action.err);
            
        case "CREATE_PRODUCT":
            console.log("Product was created",action);
            break;
        case "CREATE_PRODCUT_ERROR":
            console.log("ERROR:", action.error)
        case "SET_PRODUCT_AS_SELECTED":
            console.log(action);
            
            state = {...state, selectedProduct: action.state}
        default:
    }  
    return state
}
    
export default productReducer;