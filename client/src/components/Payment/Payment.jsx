import { useState } from "react"
import { Navigate } from "react-router-dom"

import './styles/style.scss'

const Payment = () => {
    // only for visual matters, would still need to be validated in the backend +
    // the implementation of a payment gateway like stripe, which does the verification of the
    // card credentials & work as a payment gateway.

    // could add validation of card brand by bin-number (first 4-6 digits)
    const user = localStorage.getItem('buy') ? JSON.parse(localStorage.getItem('buy')): JSON.parse(localStorage.getItem('userInfo'))

    const [creditCardNumber, setCreditCardNumber] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [cardHolder, setCardHolder] = useState('')

    const masks = {
        onlyNumbers(value){
            return String(value).replace(/\D/g, '')
        },

        cardNumberMask(value){
            //replace all characters that are not decimals
            return value.replace(/\D/g, '')
            .replace(/(\d{4})(\d)/, '$1 $2')
            .replace(/(\d{4})(\d)/, '$1 $2')
            .replace(/(\d{4})(\d)/, '$1 $2')
        },
        cvvMask(value){
            //Replace all characters that are not decimals
            return value.replace(/\D/g, '')
        },
        cardHolderMask(value){
            //replace all characters that are not letters or space
            return value.replace(/[^a-zA-Z ]/g, '')
        }
    }

    const isValidCardNumber = () => {
        const rawCardNumber = masks['onlyNumbers'](creditCardNumber)

        if(rawCardNumber.length > 16) return false

        const oddNumbers = [...String(rawCardNumber)].filter((cv, i) => i % 2 === 1)
        const checkFor2DigitsWhenDoubled = oddNumbers.filter((cv) => cv * 2 >= 10)
        if(checkFor2DigitsWhenDoubled.length > 0){
            const sumAllDigits = [...String(rawCardNumber)].reduce((cv, pv) => Number(cv) + Number(pv))
            if(sumAllDigits % 10 === 0) return true
            if(sumAllDigits % 10 > 0) return false
        }
        if(checkFor2DigitsWhenDoubled.length < 1){
            return false
        }
    }

    const handleInputChange = (e, inputToBeChanged) => {
        e.preventDefault()

        if(inputToBeChanged === 'creditCardNumber') {
            const targetWithoutMask = e.target.value.replaceAll(' ', '')
            if(targetWithoutMask.length > 16) return alert('max length of a credit card is 16') 
            
            setCreditCardNumber(masks['cardNumberMask'](targetWithoutMask))
        }

        if(inputToBeChanged === 'cvv'){
            if(e.target.value.length > 3) return alert('max length of CVV is 3 digits')
            setCvv(masks['cvvMask'](e.target.value))
        }

        if(inputToBeChanged === 'expirationDate'){
            setExpirationDate(e.target.value)
        }

        if(inputToBeChanged === 'cardHolder'){
            setCardHolder(masks['cardHolderMask'](e.target.value))
        }
    }

    const handleFormSubmit = (e) => {
        if(!isValidCardNumber()) {
            alert('invalid credit card')
            return e.preventDefault()
        }
        if(!Number(cvv)) {
            alert('invalid credit card')
            return e.preventDefault()
        }
        if(!expirationDate){
            alert('invalid date')
            return e.preventDefault()
        }

        const charsInHolderName = [...cardHolder]
        const isNumberInHoldersChars = charsInHolderName.filter(cv => Number(cv) || cv === '/[ `!@#$%^&*()_+-=[]{};:|,.<>/?~]/' || cv === '"' || cv === "'")

        if(isNumberInHoldersChars.length > 0) {
            alert('invalid name')
            return e.preventDefault()
        }

    }

    if(!JSON.parse(localStorage.getItem('userInfo')).cart || JSON.parse(localStorage.getItem('userInfo')).cart.length < 1) return <Navigate to='/'/>

    return <>
        <div className="card_container">
            <div className="card_container_header">
                <span>Total amount to be Paid </span>
                <h2>${user.cart.length > 1 ? user.cart.reduce((pv, cv) => {
                        return {cloth: {price: (pv.cloth.quantity || 1) * pv.cloth.price + (cv.cloth.quantity || 1) * cv.cloth.price, quantity: 1}}
                    }).cloth.price.toFixed(2).replace('.', ',') : (user.cart[0].cloth.price * (user.cart[0].cloth.quantity || 1)).toFixed(2).replace('.', ',')}</h2>
            </div>
            <form className="card_form" onSubmit={(e) => handleFormSubmit(e)}>
                <label htmlFor="card_number">Credit cart Number</label>
                <input id="card_number" className="card_input" type="text" onChange={(e) => handleInputChange(e, 'creditCardNumber')} value={creditCardNumber}/>
                <label htmlFor="holder_name">Cart Holder name</label>
                <input id='holder_name' className="card_input" type="text" onChange={(e) => handleInputChange(e, 'cardHolder')} value={cardHolder}/>
                <label htmlFor="expiration_date">expiration date</label>
                <input id="expiration_date" className="card_input" type="date" onChange={(e) => handleInputChange(e, 'expirationDate')} value={expirationDate}/>
                <label htmlFor="cvv">Security code - CVV</label>
                <input id="cvv" className="card_input" type="text" onChange={(e) => handleInputChange(e, 'cvv')} value={cvv}/>

                <button className="send">Finish</button>
            </form>
            
        </div>
    </>
}

export default Payment