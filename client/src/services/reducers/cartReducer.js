import {ADD_CART_FAIL, ADD_CART_REQUEST, ADD_CART_SUCCESS} from '../constants/cartConstants'
import {REMOVE_CART_FAIL, REMOVE_CART_REQUEST, REMOVE_CART_SUCCESS} from '../constants/cartConstants'
import {SUBTRACT_CART_FAIL, SUBTRACT_CART_REQUEST, SUBTRACT_CART_SUCCESS} from '../constants/cartConstants'


const cartReducer = (state={}, action) => {
    switch (action.type) {
        case ADD_CART_REQUEST:
            return Object.assign({}, state, action.payload);
        
        case ADD_CART_FAIL:
            return Object.assign({}, state, action.payload);

        case ADD_CART_SUCCESS:
            return Object.assign({}, state, action.payload);

        case SUBTRACT_CART_REQUEST:
            return Object.assign({}, state, action.payload);
        
        case SUBTRACT_CART_FAIL:
            return Object.assign({}, state, action.payload);

        case SUBTRACT_CART_SUCCESS:
            return Object.assign({}, state, action.payload);

        case REMOVE_CART_REQUEST:
            return Object.assign({}, state, action.payload);
        
        case REMOVE_CART_FAIL:
            return Object.assign({}, state, action.payload);

        case REMOVE_CART_SUCCESS:
            return Object.assign({}, state, action.payload);

        default: return state
    }
}

export default cartReducer