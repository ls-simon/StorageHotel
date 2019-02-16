
export const createProductAction = (payload) => {
    return(dispatch, getState, {getFirebase, getFirestore}) =>{
        const firestore = getFirestore();
        firestore.collection("products").add({
            ...payload,
            ownerRef: firestore.collection('users').doc(payload.ownerRef),
            ownerName: payload.ownerName,
            created: new Date(),
        }).then(()=>{
            dispatch({type:"CREATE_PRODUCT", payload})
        }).catch((err)=>{
            dispatch({type:"CREATE_PRODUCT_ERROR",err})
        })
    }
};

export const updateProductAction = (payload) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        firestore.collection("products").doc(payload.id).update({
            ...payload
        }).then(()=> {
            dispatch({type:"UPDATE_PRODUCT", payload})
        }).catch((err) => {
            dispatch({type:"UPDATE_PRODUCT_ERROR", err})
        })

    }
}

export const deleteProductAction = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        console.log("Deleting", id)

        const firestore = getFirestore()
        
        firestore.collection("products").doc(id).delete().then(()=> {
            dispatch({type:"DELETE_PRODUCT", id})
        }).catch((err) => {
            dispatch({type:"DELETE_PRODUCT_ERROR", err})
        })

    }
}