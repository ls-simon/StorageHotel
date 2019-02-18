
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const blankOrder = {orderLines:[],
                    customer:"",
                    selectedOrder:[]
};

export const createOrder = (order) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

        const firestore = getFirestore();
        firestore.collection('projects').add({
            ...order,
            date: new Date()
        }).then(()=> {
            
            dispatch({type: 'CREATE_ORDER', order})
        }).catch((err) => {
            dispatch({type: 'CREATE_ORDER_ERROR', err})
        })
    }
}
export const setSelectedOrderAction =()=>{
    
}


export default createStore(createOrder, applyMiddleware(thunkMiddleware))

