import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import orderReducer from "./orderReducer"
import addressReducer from "./addressReducer"
import productReducer from "./productReducer"
import profileReducer from "./profileReducer"
import {firestoreReducer} from "redux-firestore"
import {firebaseReducer} from "react-redux-firebase"


const rootReducer = combineReducers({
    addressReducer,
    profileReducer,
    productReducer,
    loginReducer,
    orderReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer