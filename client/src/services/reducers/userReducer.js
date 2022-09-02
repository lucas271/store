import {LOGIN_FAIL,LOGIN_REQUEST, LOGIN_SUCCESS} from '../constants/userConstants'
import {REGISTER_FAIL,REGISTER_REQUEST, REGISTER_SUCCESS} from '../constants/userConstants'

const userReducer = (state={}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, action.payload)
        
        case LOGIN_SUCCESS: 
            return Object.assign({}, state, action.payload)

        case LOGIN_FAIL:
            return Object.assign({}, state, action.payload)


        case REGISTER_REQUEST:
            return Object.assign({}, state, action.payload)

        case REGISTER_SUCCESS:
            return Object.assign({}, state, action.payload)

        case REGISTER_FAIL:
            return Object.assign({}, state, action.payload)
    
        default: return state
    }
}

export default userReducer