const mongoose = require('mongoose')
const userModel = mongoose.model('store')

module.exports.addItem = async (body) => {
    const cartInUserDB = (await userModel.findOne({email: body.email})).cart

    const itemsDifferent = cartInUserDB.filter(cart => cart.cloth.id !== body.cart.cloth.id)
    const itemInCart = cartInUserDB.find(cart => cart.cloth.id === body.cart.cloth.id)

    if(itemInCart){
        itemInCart.cloth.quantity = itemInCart.cloth.quantity ? itemInCart.cloth.quantity + 1 : 2
        itemsDifferent.unshift(itemInCart)
        const updatedCart = {cart: itemsDifferent}
        await userModel.updateOne({email: body.email}, updatedCart)
        return itemsDifferent   
    }

    itemsDifferent.push(body.cart) 

    await userModel.updateOne({email: body.email}, {cart: itemsDifferent})

    return itemsDifferent 
}

module.exports.subtractItem = async (body) => {
    const cartInUserDB = (await userModel.findOne({email: body.email})).cart

    const itemsDifferent = cartInUserDB.filter(cart => cart.cloth.id !== body.cart.cloth.id)
    const itemInCart = cartInUserDB.find(cart => cart.cloth.id === body.cart.cloth.id)

    if(itemInCart){
        itemInCart.cloth.quantity = itemInCart.cloth.quantity ? itemInCart.cloth.quantity - 1 : 0
        itemInCart.cloth.quantity > 0 && itemsDifferent.unshift(itemInCart)
        const updatedCart = {cart: itemsDifferent}
        await userModel.updateOne({email: body.email}, updatedCart)
        return itemsDifferent   
    }
}

module.exports.removeItem = async (body) => {
    const data = await userModel.findOne({email: body.email})
    const item = data.cart.find(item => item.cloth.id === body.itemID)
    if(item) data.cart.splice(data.cart.indexOf(item), 1)
    await userModel.updateOne({email: body.email}, {cart: data.cart})
    return {email: data.email, cart: data.cart}
}