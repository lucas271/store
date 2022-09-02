import { useContext, useEffect, useState } from "react"

import { useDispatch, useSelector } from 'react-redux'
import {loginAction} from '../../services/actions/userAction'

import { LoginContext, validateUser} from "../../pages/UserAuth/UserAuth"

import { Email, Lock } from "@mui/icons-material/"
import TextField from '@mui/material/TextField';
import loadingGif from '../../assets/loading.gif'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()

    const loginOutput = useSelector(state => state.user)
    const {isLogin, setIsLogin} = useContext(LoginContext)
    const dispatch = useDispatch()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setError('')
        const validationFun = validateUser(email, password)
        if(validationFun) {
            return setError(validationFun)
        }

        dispatch(loginAction(email, password))
    }

    useEffect(() => {
        if(loginOutput.message && loginOutput.message.error) return setError(loginOutput.message.error[0])
        if(loginOutput.message && loginOutput.message.success) window.location = '/'
    }, [loginOutput])

    
    if(!loginOutput.loading) {
        return <section className={!isLogin ? 'user_auth_container_hidden': 'user_auth_container_right'}>
            {error && <span className="error_container">
                {error}
            </span>}

            <h1 className="form_text">Login</h1>

            <form className="user_auth_form" onSubmit={(e) => handleFormSubmit(e)}>
                <TextField  
                    label={<Email/>}
                    placeholder={'email'}
                    type='email'
                    value={email}
                    onChange={(e => setEmail(e.target.value))} 
                    className='form_input' 
                />
                <TextField  
                    label={ <Lock/>}
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='form_input'
                />

                <button className='send_btn'>send</button>

                <p className='change_form'>
                    already have an account? 
                    <span onClick={() => setIsLogin(false)}> Register</span>
                </p>      
            </form>
        </section>
    }
    return (

    <section className={!isLogin ? 'user_auth_container_hidden': 'user_auth_container_right'}>
        <img className="loading_gif" src={loadingGif} alt="loading gif" />
    </section>
    )
}

export default Login