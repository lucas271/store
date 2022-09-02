import {createStore, combineReducers, applyMiddleware, } from 'redux'
import thunk from 'redux-thunk'

import cartReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store