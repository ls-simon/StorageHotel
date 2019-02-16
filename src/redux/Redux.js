import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers/rootReducer";
import {sessionService} from "redux-react-session";
import thunk from "redux-thunk";
import {reduxFirestore,getFirestore} from "redux-firestore";
import {reactReduxFirebase,getFirebase} from "react-redux-firebase"
import config from "./../config/firebaseConfig";

const store = createStore(rootReducer,
    compose (
        applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
        reduxFirestore(config),
        reactReduxFirebase(config,{useFirestoreForProfile:true, userProfile: "users", attachAuthIsReady: true}),
    )
);
sessionService.initSessionService(store);

export default store;