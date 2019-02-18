const initialState = {
    userName:"",
    nickName:"",
    email:"",
    phoneNumber:"",
    address:"",
    zipCode:"",
    city:"",
    country:"",
}

const profileReducer = (state = initialState, action) => {
    
    switch(action.type){
        case "SET_PROFILE_NICKNAME":
        case "SET_PROFILE_USERNAME":
        case "SET_PROFILE_EMAIL":
        case "SET_PROFILE_PHONENUMBER":
        case "SET_PROFILE_ADDRESS":
        case "SET_PROFILE_ZIPCODE":
        case "SET_PROFILE_CITY":
        case "SET_PROFILE_COUNTRY":
            state = {...state, ...action.payload}
            break;
        default:
    }  
    return state;
}

export default profileReducer;
