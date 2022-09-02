import { useEffect, useState } from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'
import { addToCartAction } from "../../services/actions/cartAction"

import clothesDB from '../../products'

import './styles/style.scss'

const ItemPage = () => {
    const navigate = useNavigate()

    const {id} = useParams()
    const [item, setItem] = useState() 
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        setItem(clothesDB.clothes.find((item) => item.cloth.id === id))
    }, [id])

    const handleAddToCart = () => {
        dispatch(addToCartAction(item, 
        localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).email ? 
        JSON.parse(localStorage.getItem('userInfo')).email :
        ''))
    }

    const handleBuy = (price) => {
        localStorage.setItem('buy', JSON.stringify({cart: [{cloth: {price, quantity: 1}}]}))
        return navigate('/payment')
    }


    //navigate to unexisting route if item isn't find in DB
    if(!clothesDB.clothes.find((item) => item.cloth.id === id)) return <Navigate to={'/d/dsa'}/>

    return <>
        <main className="item_container">
            <img src={item && item.cloth.image} alt="" />
            <div className="item_utils_container">
                {
                    item && <div className="item_info_container">
                        <h2>{item.cloth.type}</h2>
                        <p>{item.cloth.description}</p>
                        <p className="price">${(item.cloth.price.toFixed(2)).replace('.', ',')}</p>
                    </div>
                }

                <div className="item_btns">
                    <button disabled={cart.loading} className="add_to_cart" onClick={handleAddToCart}>
                        add item to cart
                    </button>
                    <button className="buy_item" onClick={() => handleBuy(item.cloth.price)}>Buy</button>
                </div>
            </div>

        </main>
    </>
}

export default ItemPage