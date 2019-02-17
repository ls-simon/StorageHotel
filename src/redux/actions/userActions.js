export const updateCustomerAction = (payload) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firestore = getFirestore();
        console.log(payload.phoneNumber)
        firestore.collection("users").doc(payload.id).update({
           ...payload.customer, contactInformation: {
                ...payload.contactInformation
           }
        }).then(()=>{
            dispatch({type:"UPDATE_CUSTOMER_SUCCESS", payload})
        }).catch((err)=>{
            dispatch({type:"UPDATE_CUSTOMER_ERROR",err})
        })
    }

}