import './style/style.scss'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import loading from '../../assets/loading.gif'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const getUpdatedUser = useSelector(state => state.cart)

    //update user
    useEffect(() => {
        if(getUpdatedUser && getUpdatedUser.cart) setUser(getUpdatedUser)
    }, [getUpdatedUser])

    const numberOfItemsInCart = () => {
        if(!user) return 0
        const userCart = user.cart
        
        //check if there's at least one item in cart && if cart exists
        if(!userCart) return 0
        if(userCart.length < 1) return 0

        const numberOfItemInCart = userCart.reduce((pv, cv) => {
            if(cv.cloth.quantity && pv.cloth.quantity) return {
                cloth: {quantity: Number(pv.cloth.quantity) + Number(cv.cloth.quantity)}
            }
            if(cv.cloth.quantity && !pv.cloth.quantity) return {
                cloth: {quantity: cv.cloth.quantity + 1}
            }
            if(!cv.cloth.quantity && pv.cloth.quantity) return {
                cloth: {quantity: pv.cloth.quantity + 1}
            }
            if(!cv.cloth.quantity && !pv.cloth.quantity) return {
                cloth: {quantity: 2}
            }
            return {cloth: {quantity: 1}}

        }).cloth.quantity
    
        //handle only one item in cart
        if(!numberOfItemInCart) return 1
    
        return numberOfItemInCart
    }

    return <>
        <header className="navbar_container">
            <nav className="navbar">
                <h1><Link to="/">Store</Link></h1>
                <ul>

                    {localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).email ?
                        <li>
                            <a href="/" onClick={() => localStorage.removeItem('userInfo')}>
                                Logout
                            </a>
                        </li>
                    :
                        <li><Link to="/userAuth">Login</Link></li>
                    }
                    <li className='cart'><Link to="/cart"><ShoppingCartIcon/> 
                    <span className='cart_items_number'>
                        {!getUpdatedUser.loading ? numberOfItemsInCart() : <img className='loading' src={loading} alt='loading'/>}
                    </span></Link></li>
                </ul>
            </nav>
        </header>
    </>
}

export default Navbar