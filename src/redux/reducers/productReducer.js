const initialState ={
    id: "", 
    quantity:"", 
    name:"", 
};

const loginReducer = (state = initialState, action) => {
    
    switch(action.type){
        case "SET_PRODUCT_ID":
        case "SET_PRODCUT_QUANTITY":
        case "SET_PRODUCT_NAME":
            state = {...state, ...action.payload}                
            break;
        case "DELETE_ADRESS":
            state ={...state, initialState} 
            break;
        case "CREATE_PRODUCT":
            console.log("Product was created",action);
            break;
        case "CREATE_PRODCUT_ERROR":
            console.log("ERROR:", action.error)
        default:
    }  
    return state
}
    
export default loginReducer;