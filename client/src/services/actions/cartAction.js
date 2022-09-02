import axios from 'axios'

import {ADD_CART_FAIL, ADD_CART_REQUEST, ADD_CART_SUCCESS} from '../constants/cartConstants'
import {SUBTRACT_CART_FAIL, SUBTRACT_CART_REQUEST, SUBTRACT_CART_SUCCESS} from '../constants/cartConstants'
import {REMOVE_CART_FAIL, REMOVE_CART_REQUEST, REMOVE_CART_SUCCESS} from '../constants/cartConstants'


const config = {
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: 'include',
}

export const addToCartAction = (item, email) => {
    return async dispatch => {
        try {
            dispatch({type: ADD_CART_REQUEST, payload: {loading: true, loadingItem: item.cloth.id}})

            //create artificial delay to add item to user cart in DB
            setTimeout(async () => {
                if(email){
                    const {data} = await axios.post('http://localhost:3001/addToCart', {cart: item, email}, config)
                    localStorage.setItem('userInfo', JSON.stringify({email, cart: data}))
                    dispatch({type: ADD_CART_SUCCESS, payload: {
                        loading: false,
                        loadingItem: item.cloth.id,
                        message: {success: 'item added sucessfuly'},
                        cart: [...data]
                    }})
                }
                
                if(!email){
                    let cart = JSON.parse(localStorage.getItem('userInfo'))
                    if(cart){                        
                        const itemInCart = cart.cart.find(cv => cv.cloth.type === item.cloth.type)

                        if(itemInCart){
                            itemInCart.cloth.quantity = itemInCart.cloth.quantity ? itemInCart.cloth.quantity + 1 : 2;                           
                            cart.cart.splice(cart.cart.indexOf(itemInCart), 1, itemInCart)

                            localStorage.setItem('userInfo', JSON.stringify({cart: [...cart.cart]}))

                            dispatch({type: ADD_CART_SUCCESS, payload: {
                                loading: false,
                                loadingItem: item.cloth.id,
                                message: {success: 'item added sucessfuly'},
                                cart: [...cart.cart]
                            }})
                        }

                        if(!itemInCart) {
                            cart.cart.push(item)
    
                            localStorage.setItem('userInfo', JSON.stringify({cart: [...cart.cart]}))
    
                            return dispatch({type: ADD_CART_SUCCESS, payload: {
                                loading: false,
                                loadingItem: item.cloth.id,
                                message: {success: 'item added sucessfuly'},
                                cart: [...cart.cart]
                            }})
                        }
                    }
                    if(!cart){
                        cart = item
                        localStorage.setItem('userInfo', JSON.stringify({cart: [cart]}))

                        dispatch({type: ADD_CART_SUCCESS, payload: {
                            loading: false,
                            loadingItem: item.cloth.id,
                            message: {success: 'item added sucessfuly'},
                            cart: [cart]
                        }})
                    }
                }
            }, 1000)

        } catch (error) {
            dispatch({type: ADD_CART_FAIL, payload: {loading: false, loadingItem: item.cloth.id, message: {error: ['server error']}}})
        }
    }
}

export const subtractFromCartAction = (item, email) => {
    return async dispatch => {
        try {
            dispatch({type: SUBTRACT_CART_REQUEST, payload: {loading: true, loadingItem: item.cloth.id}})

            //create artificial delay to add item to user cart in DB
            setTimeout(async () => {
                if(email){
                    const {data} = await axios.post('http://localhost:3001/subtractFromCart', {cart: item, email}, config)
                    localStorage.setItem('userInfo', JSON.stringify({email, cart: data}))
                    dispatch({type: SUBTRACT_CART_SUCCESS, payload: {
                        loading: false,
                        loadingItem: item.cloth.id,
                        message: {success: 'item removed sucessfuly'},
                        cart: [...data]
                    }})
                }
                
                if(!email){
                    let cart = JSON.parse(localStorage.getItem('userInfo'))
                    if(cart){                        
                        const itemInCart = cart.cart.find(cv => cv.cloth.type === item.cloth.type)

                        if(itemInCart){
                            itemInCart.cloth.quantity = itemInCart.cloth.quantity ? itemInCart.cloth.quantity - 1 : 0;                           
                            
                            itemInCart.cloth.quantity > 0 ? 
                            cart.cart.splice(cart.cart.indexOf(itemInCart), 1, itemInCart):
                            cart.cart.splice(cart.cart.indexOf(itemInCart), 1)

                            localStorage.setItem('userInfo', JSON.stringify({cart: [...cart.cart]}))

                            dispatch({type: SUBTRACT_CART_SUCCESS, payload: {
                                loading: false,
                                loadingItem: item.cloth.id,
                                message: {success: 'item REMOVED sucessfuly'},
                                cart: [...cart.cart]
                            }})
                        }
                    }
                }
            }, 1000)

        } catch (error) {
            dispatch({type: SUBTRACT_CART_FAIL, payload: {loading: false, loadingItem: item.cloth.id, message: {error: ['server error']}}})
        }
    }
}



export const removeFromCartAction = (itemID) => {
    return async dispatch => {
        try {
            dispatch({type: REMOVE_CART_REQUEST, payload: {loading: true}})

            const {email} = JSON.parse(localStorage.getItem('userInfo'))

            if(email){
                const {data} = await axios.post('http://localhost:3001/removeFromCart', {itemID, email}, config)
 
                console.log(data)

                dispatch({type: REMOVE_CART_SUCCESS, payload: {
                    loading: false,
                    message: {success: 'item removed sucessfuly'},
                    cart: [...data.cart]
                }})

                localStorage.setItem('userInfo', JSON.stringify(data))
            }

            if(!email){
                const user = JSON.parse(localStorage.getItem('userInfo'))
                const item = user.cart.find(item => item.cloth.id === itemID)
                user.cart.splice(user.cart.indexOf(item), 1)

                dispatch({type: REMOVE_CART_SUCCESS, payload: {
                    loading: false,
                    message: {success: 'item removed sucessfuly'},
                    cart: [...user.cart]
                }})
                localStorage.setItem('userInfo', JSON.stringify(user))
            }
        } catch (error) {
            dispatch({type: REMOVE_CART_FAIL, payload: {
                loading: false,
                message: {error: [error]},
            }})
        }
    }
}