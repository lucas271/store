const {addItem, removeItem, subtractItem} = require('../modules/CartModule')

module.exports.addToCartController = async (req, res) => {
    try {
        const updatedUser = await addItem(req.body)
        res.send(updatedUser)
    } catch (error) {
        res.send({errors: 'server error'})   
    }
}

module.exports.subtractFromCartController = async (req, res) => {
    try {
        const updatedUser = await subtractItem(req.body)
        res.send(updatedUser)
    } catch (error) {
        res.send({errors: 'server error'})   
    }
}

module.exports.removeFromCart = async (req, res) => {
    try {
        const updatedUser = await removeItem(req.body)
        res.send(updatedUser)
    } catch (error) {
        res.send({errors: 'server error'})
    }
}