import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react'


import Navbar from './components/Navbar/Navbar'

import UserAuth from './pages/UserAuth/UserAuth'
import Home from './pages/Home/Home'
import Page404 from './pages/Page404/Page404'
import ItemPage from './pages/ItemPage/ItemPage'
import Cart from './pages/Cart/Cart'


import './styles/global.scss'
import Payment from './components/Payment/Payment'

const WithNavbarRoutes = () => {
    return <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/:id' element={<ItemPage/>}/>
            <Route path='/cart' element={<Cart/>} />
            <Route path='/payment' element={<Payment/>} />

            <Route path='*' element={<Page404/>}/>
        </Routes>
    </>
}

const RoutesComponent = () => {
    return <>
        <Router>
            <Routes>                
                <Route path='*' element={<WithNavbarRoutes/>}/>
                <Route path='/userAuth' element={<UserAuth/>}/>
            </Routes>
        </Router>
    </>
}



export default RoutesComponent