const initState = {item: {}}

export const setItemAsSelectedAction = (state = initState) => {
    
    return (dispatch, getState, {getFirebase, getFirestore}) => {

        if (state.orderLines) {
            dispatch({type: 'SET_ORDER_AS_SELECTED', state})
        } else {
            dispatch({type: 'SET_PRODUCT_AS_SELECTED', state})
        }

       
    }
}