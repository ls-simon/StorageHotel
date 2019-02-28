const initState = {selectedOrder: {} }

const orderReducer = (state = initState, action) => {
   switch (action.type) {
       case 'SET_ORDER':
        console.log("Setting order to newOrder props: ",action.payload)
        return {...state, newOrder: action.payload}
       case 'SET_ORDER_AS_SELECTED':
        console.log("STATE", state, "ACTION", action)
        return {...state, selectedOrder: action.state}
       case 'CREATE_ORDER':
        console.log('created order', action.payload)    
        return state
       case 'DELETE_ORDER':
       console.log('deleted order', action.order)
       break;
       case 'EDIT_ORDER':
       console.log('edited order', action.order)
       break;
       case 'ATTACH_CUSTOMER_TO_ORDER':
       return action.customer
       case 'CREATE_ORDER_ERROR':
        console.log(action.order);
        
       default: 
   }
    return state
}

export default orderReducer