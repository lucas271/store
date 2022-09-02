import { useContext, useState, useEffect } from "react"

import { useDispatch, useSelector } from 'react-redux'
import {registerAction} from '../../services/actions/userAction'

import { validateUser, LoginContext } from "../../pages/UserAuth/UserAuth";

import {Email, Lock} from '@mui/icons-material/'
import TextField from '@mui/material/TextField';
import loadingGif from '../../assets/loading.gif'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')

    const registerOutput = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {isLogin, setIsLogin} = useContext(LoginContext)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setError('')
        const validationFun = validateUser(email, password, true, repeatPassword)
        if(validationFun) {
            return setError(validationFun)
        }
        dispatch(registerAction(email, password, repeatPassword))
    }

    useEffect(() => {
        console.log(!registerOutput.message)
        console.log(registerOutput.message && registerOutput.message.error)
        if(registerOutput.message && registerOutput.message.error) return setError(registerOutput.message.error[0])
        if(registerOutput.message && registerOutput.message.success) window.location = '/'
    }, [registerOutput])

    if(!registerOutput.loading){
        return <section className={isLogin ? 'user_auth_container_hidden': 'user_auth_container_left'}>

            {error && <span className="error_container">
                {error}
            </span>}
            <h1>Register</h1>

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

                <TextField  
                    label={ <Lock/>}
                    placeholder='repeat password'
                    type='password'
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)}
                    className='form_input'
                />

                <button className='send_btn'>send</button>

                <p className='change_form' >
                    don't have an account? 
                    <span onClick={() => setIsLogin(true)}> Login</span>
                </p>      
            </form>  

        </section>
    }

    return <>
        <section className={isLogin ? 'user_auth_container_hidden': 'user_auth_container_left'}>
                <img className="loading_gif" src={loadingGif} alt="loading gif" />
        </section>
    </>
}

export default Register