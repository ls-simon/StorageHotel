export const signIn = (credentials) =>{
    return (dispatch, getState, {getFirebase})=>{
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then( ()=> {
            dispatch({type: "LOGIN_SUCCESS"})
        }).catch((error)=>{
            dispatch({type: "LOGIN_ERROR",error})
        })
    }
}

export const signOut = () =>{
    return (dispatch,getState,{getFirebase}) =>{
        const firebase = getFirebase();
        firebase.auth().signOut().then(()=>{
            dispatch({type: "SIGNOUT_SUCCESS"})
        }).catch((error)=>{
            dispatch({type: "SIGNOUT_ERROR",error})
        })
    }
}

export const signUp = (payload) =>{
    return(dispatch,getState,{getFirebase,getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            payload.email,
            payload.password
        ).then((res)=>{
            return firestore.collection("users").doc(res.user.uid).set({
                name:payload.nickName,
                userType:payload.userType,
                contactInformation:{
                    email:payload.email,
                    phoneNumber:payload.phoneNumber,
                    address: payload.address,
                    city: payload.city,
                    zipCode:payload.zip
                }
            })
        }).then(()=>{
            dispatch({type:"SIGNUP_SUCCESS"})
        }).catch(error =>{
            dispatch({type:"SIGNUP_ERROR",error})
        })
    }
}

export const signUpEmployee = (payload) =>{
    return(dispatch,getState,{getFirebase,getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            payload.email,
            payload.password
        ).then((res)=>{
            return firestore.collection("users").doc(res.user.uid).set({
                name:payload.nickName,
                userType:"employee",
                email:payload.email
            })
        }).then(()=>{
            dispatch({type:"SIGNUP_SUCCESS"})
        }).catch(error =>{
            dispatch({type:"SIGNUP_ERROR",error})
        })
    }
}