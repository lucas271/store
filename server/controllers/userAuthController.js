const UserAuth = require('../modules/UserAuthModule')

module.exports.loginController =  async (req, res) => {
    try {
        const login = new UserAuth(req.body)
        await login.login()
    
        if(login.errors.length > 0){
            return res.send({errors: [login.errors]})
        }
    
        res.send({user: {email: login.user.email, cart: login.user.cart}})
    } catch (error) {
        res.send({errors: 'database error'})
    }

}

module.exports.registerController = async (req, res) => {
    try {
        const register = new UserAuth(req.body)
        await register.register()
    
        if(register.errors.length > 0){
            return res.send({errors: [register.errors]})
        }
    
        res.send({user: {email: register.user.email}})
    } catch (error) {
        res.send({errors: 'database error'})
    }
}