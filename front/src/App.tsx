

import './App.css'
import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Hombre } from './pages/Hombre'
import { Mujeres } from './pages/Mujeres'
import { Kids } from './pages/Kids'
import { ProductPage } from './pages/ProductPage'
import { Carrito } from './pages/Carrito'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import  {Payment}  from './pages/Payment'

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/hombres' element={<Hombre/>}></Route>
        <Route path='/mujeres' element={<Mujeres/>}></Route>
        <Route path='/niños' element={<Kids/>}></Route>
        <Route path='/product/:id' element={<ProductPage/>}></Route>
        <Route path='/carrito' element={<Carrito/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/config/:amount' element={<Payment/>}></Route>
     </Routes>
    </>
  )
}

export default App
