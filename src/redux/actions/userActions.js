export const updateCustomerAction = (action) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firestore = getFirestore();
        const firebase = getFirebase();

        console.log(action.payload);
        
        firebase.auth().currentUser.updateEmail(action.payload.profile.contactInformation.email)
        .then(() => {
            console.log("GOT HERE", action.payload);
            
            firestore.collection("users").doc(action.payload.id).update({
                name: action.payload.profile.name, contactInformation: {...action.payload.profile.contactInformation}
              }).then((res)=>{
                  console.log(res)
                  dispatch({type:"UPDATE_CUSTOMER_SUCCESS", res})
              }).catch((err)=>{
                  dispatch({type:"UPDATE_CUSTOMER_ERROR",err})
              })
        })
       
    }

}

export const fetchCustomerInfo = (payload) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firestore = getFirestore();
       
        firestore.collection("users").doc(payload.id).get()
        .then(()=>{
            dispatch({type:"CUSTOMER_INFO_SUCCESS", payload})
        }).catch((err)=>{
            dispatch({type:"CUSTOMER_INFO_ERROR",err})
        })
    }

}
