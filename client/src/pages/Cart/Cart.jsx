import { Link, useNavigate } from "react-router-dom"

import './styles/style.scss'
import { removeFromCartAction } from "../../services/actions/cartAction"
import { useDispatch} from "react-redux"
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { addToCartAction, subtractFromCartAction } from "../../services/actions/cartAction"
import { KeyboardArrowLeft } from "@mui/icons-material"
import loading from '../../assets/loading.gif'

const Cart = () => {
    localStorage.getItem('buy') && localStorage.removeItem('buy')

    const [user, setUser] = useState(localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')))
    const getUpdatedUser = useSelector(state => state.cart)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    //update cart
    useEffect(() => {
        if(getUpdatedUser && getUpdatedUser.cart) setUser(getUpdatedUser)
    }, [getUpdatedUser])

    if(!(user && user.cart) || user.cart.length < 1){
        return <article className="empty_cart">
            <h3>No Items in Cart &#128546; <br/> <Link to='/'> Go shop!! </Link></h3>
        </article>
    }

    return <>
        <div className="cart_container">
            <div className="cart_table_container">
                <div className="cart_item_container description">
                    <span className='cart_item_field'>Name</span>
                    <span className='cart_item_field'>description</span>
                    <span className='cart_item_field'>quantity</span>
                    <span className='cart_item_field'>price</span>
                    <span className='cart_item_field'>total</span>
                </div>

                {user.cart.map(item => {
                    return <div className="cart_item_container" key={item.cloth.id}>
                        <h2 className='cart_item_field'> <a href={"/"+item.cloth.id}>{item.cloth.type}</a></h2>
                        <p className='cart_item_field'>{item.cloth.description}</p>
                        <span className='cart_item_field'>

                        <KeyboardArrowLeft className="quantity_arrow" onClick={() => {
                            !getUpdatedUser.loading &&
                            dispatch(subtractFromCartAction(item, 
                                localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).email ? 
                                JSON.parse(localStorage.getItem('userInfo')).email :''
                            ))
                        }}/>
                            
                        {getUpdatedUser.loading && getUpdatedUser.loadingItem === item.cloth.id ? <img src={loading} className='loading' alt='loading'/> : item.cloth.quantity || 1} 
                        
                        <KeyboardArrowRightIcon disabled={getUpdatedUser.loading} className="quantity_arrow" onClick={() => {
                            !getUpdatedUser.loading &&
                            dispatch(addToCartAction(item, 
                                localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).email ? 
                                JSON.parse(localStorage.getItem('userInfo')).email :''
                            ))
                        }}/>
                        <br/></span>
                        <span className='cart_item_field'>${(item.cloth.price).toFixed(2).replace('.', ',')}</span>
                        <span className="cart_item_field">${(item.cloth.price * (item.cloth.quantity ? item.cloth.quantity : 1)).toFixed(2).replace('.', ',')}</span>
                        <span className='trash' onClick={() => dispatch(removeFromCartAction(item.cloth.id))}><DeleteIcon/></span>
                    </div>
                })}

            </div>
            
            <div className="cart_footer_container">
                <h2>
                    total: ${user.cart.length > 1 ? user.cart.reduce((pv, cv) => {
                        return {cloth: {price: (pv.cloth.quantity || 1) * pv.cloth.price + (cv.cloth.quantity || 1) * cv.cloth.price, quantity: 1}}
                    }).cloth.price.toFixed(2).replace('.', ',') : (user.cart[0].cloth.price * (user.cart[0].cloth.quantity || 1)).toFixed(2).replace('.', ',')}
                </h2>
                <button onClick={() => navigate('/payment')}>Buy</button>
            </div>

        </div>
    </>
}

export default Cart