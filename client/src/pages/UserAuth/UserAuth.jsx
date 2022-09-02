import './styles/style.scss'
import { useState, createContext} from 'react'

import { Navigate } from 'react-router-dom'

import validator from 'validator'

import Login from '../../components/UserAuth/Login'
import Register from '../../components/UserAuth/Register'



export const LoginContext = createContext()

const UserAuth = () => {
    const [isLogin, setIsLogin] = useState(true)

    if(localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).email) return <Navigate to='/'/>    

    return <>
        <main className='page_container'>
            <LoginContext.Provider value={{isLogin, setIsLogin}}>
                <Login/>
                <Register/>
            </LoginContext.Provider>
        </main>
    </>
}

export const validateUser = (email, password, isRegister, repeatPassword) => {

        if(!email || !password) return 'empty spaces'
        if(!validator.isEmail(email)) return 'invalid Email'

        if(password.length > 20) return 'password cannot be longer than 20 chars'
        if(password.length < 6) return 'password cannot be smaller than 6 chars'

        if(!isRegister) {
            return
        }
        console.log(repeatPassword !== password)
        if(repeatPassword !== password) return 'passwords must match'
}


export default UserAuth