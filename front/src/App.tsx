import { useState } from 'react'

import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import thorimg1 from "./assets/thorimg1.png"
import thorimg2 from "./assets/thorimg2.png"
import thorimg3 from "./assets/openart-image_iyRrZYko_1723798199795_raw.png"
import thorimg4 from "./assets/thorlogo.png"
import bannerKid from './assets/banner_kids.png'
import cardImg from './assets/p1_product.png'
import bannerMan from './assets/banner_mens.png'
import bannerWomen from './assets/banner_women.png'
import Footer from './compontents/Footer'
import { Header } from './compontents/Header'
import { Home } from './pages/Home'
import { Hombre } from './pages/Hombre'
import { Mujeres } from './pages/Mujeres'
import { Kids } from './pages/Kids'
function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/hombres' element={<Hombre/>}></Route>
        <Route path='/mujeres' element={<Mujeres/>}></Route>
        <Route path='/niños' element={<Kids/>}></Route>
     </Routes>
    </>
  )
}

export default App
