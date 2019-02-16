const initState = {orders: [] }

const orderReducer = (state = initState, action) => {
   switch (action.type) {
       case 'CREATE_ORDER':
        console.log('created order', action.order)
        return state
       case 'DELETE_ORDER':
       console.log('deleted order', action.order)
       case 'EDIT_ORDER':
       console.log('edited order', action.order)

       case 'CREATE_ORDER_ERROR':
        console.log(action.order);
        
       default: 
        console.log("default");
   }
    return state
}

export default orderReducer