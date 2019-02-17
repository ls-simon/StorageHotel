const initState = {orders: [] }

const userReducer = (state = initState, action) => {
   switch (action.type) {
       case 'UPDATE_CUSTOMER_SUCCESS':
        console.log('customer updated', action.payload)
        return state
       case 'UPDATE_CUSTOMER_ERROR':
       console.log('error in updating customer', action.payload) 
       default: 
   }
    return state
}

export default userReducer