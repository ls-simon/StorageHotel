
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const blankOrder = {orderLines: [],
                    customer: "",
                    selectedOrder: []
                };

const initOrder = {}


const initState = {type: 'SET_ORDER', payload: {orderLines: [], selectedCustomer: {customerId:'', customerType: ''}}}

export const mapOrderToPropsAction = (action = initState) => {
    return (dispatch) => {
        
        dispatch({type: action.type, payload: action.payload})
    }
}

export const setOrderLinesToCartAction = (orderLines) => {
    return (dispatch) => {
        dispatch({type: 'SET_ORDERLINES', orderLines})
    }
}

export const createOrderAction = (payload) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

        const firestore = getFirestore();

      
        //Fetches orders to increment orderId
        firestore.collection('orders').get().then(snap=> { 
            let orderId = 1001 + snap.size 
            const orderLines = payload.orderLines.map((o)=> {
                
                //Updates product amount
                firestore.collection('products').doc(o.productRef).get().then((productSnap)=> {
                    const product = productSnap.data()
                    firestore.collection('products').doc(o.productRef).update({"quantity": parseInt(product.quantity)-parseInt(o.amount)});
                })

                //Returns product reference
                return {
                amount: o.amount,
                productRef: firestore.collection('products').doc(o.productRef)
                }
            })
            
            //Adds the order
            firestore.collection('orders').add({
                ownerRef: firestore.collection('users').doc(payload.ownerRef),
                ownerName: payload.ownerName,
                orderLines: orderLines,
                date: new Date().toDateString(),
                orderId: orderId,
                address: payload.address
    
            }).then(()=> {
                dispatch({type: 'CREATE_ORDER', payload})
            }).catch((err) => {
                dispatch({type: 'CREATE_ORDER_ERROR', err})
            })

        })
        
    }
}

export const deleteOrderAction = (payload) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
   
    
        payload.orderLines.forEach((orderLine)=> {
            firestore.collection('products').doc(orderLine.id).update({
                "quantity": parseInt(orderLine.amount) + parseInt(orderLine.quantity)
            })
        })
                firestore.collection('orders').doc(payload.id).delete().then(()=>{
                    dispatch({type: 'DELETE_ORDER', id: payload.id})
                }).catch((err) => {
                    dispatch({type: 'DELETE_ORDER_ERROR', err})
                })
            
        
      
    }
}

