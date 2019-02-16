const initialState ={
    company: "", 
    contactPerson:"", 
    phoneNumber:"", 
    address:"", 
    zipCode:"",
    city:"",
    country:""
};

const addressReducer = (state = initialState, action) => {
    
    switch(action.type){
        case "SET_COMPANY":
        case "SET_CONTACTPERSON":
        case "SET_PHONENUMBER":
        case "SET_ADDRESS":
        case "SET_ZIP":
        case "SET_CITY":
        case "SET_COUNTRY":
            state = {...state, ...action.payload}               
            break;
        case "DELETE_ADRESS":
            state ={...state, initialState} 
            break;
        default:
    }  
    return state
}
    
export default addressReducer;