const Router = require('express').Router()
const {loginController, registerController} = require('./controllers/userAuthController')
const {addToCartController, removeFromCart, subtractFromCartController} = require('./controllers/cartController')


Router.post('/login', loginController)
Router.post('/register', registerController)

Router.post('/addToCart', addToCartController)
Router.post('/subtractFromCart', subtractFromCartController)

Router.post('/removeFromCart', removeFromCart)

module.exports = Router