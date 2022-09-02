const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cart: {type: Array, default: []}
})

const UserModel = mongoose.model('store', userSchema, 'store')

class UserAuth{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null
    }


    async register(){
        this.userValidation()
        if(this.errors.length > 0) return

        const userExists = await UserModel.findOne({email: this.body.email})

        if(userExists) return this.errors.push('user already exists')

        const hashPassword = bcrypt.hashSync(this.body.password, 6)
        
        this.user = await UserModel.create({email: this.body.email, password: hashPassword})
    }
    

    async login(){
        this.userValidation();
        if(this.errors.length > 0) return
        
        const userExists = await UserModel.findOne({email: this.body.email})
        if(!userExists) return this.errors.push('user already exists')
        
        const checkIfPasswordsMatch = bcrypt.compareSync(this.body.password, userExists.password)
        if(!checkIfPasswordsMatch) return this.errors.push('password is wrong')

        this.user = userExists
    }

    userValidation(){
        if(!this.body.email || !this.body.password) return this.errors.push('empty spaces')
        if(!validator.isEmail(this.body.email)) this.errors.push('invalid Email')

        if(this.body.password.length > 20) this.errors.push('password cannot be longer than 20 chars')
        if(this.body.password.length < 6) this.errors.push('password cannot be smaller than 6 chars')

        if(!this.body.repeatPassword) return 
        if(this.body.repeatPassword !== this.body.password) return this.errors.push('passwords must match')
    }   
}

module.exports = UserAuth