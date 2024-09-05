

import { Link } from 'react-router-dom'


import cardImg from '../assets/product_6.png'
import kidimg from '../assets/product_31.png'
import manimg from '../assets/product_14.png'
import bannerMan from '../assets/banner_mens.png'
import bannerKid from '../assets/banner_kids.png'
import bannerWomen from '../assets/banner_women.png'
import Footer from '../compontents/Footer'
import {Header} from '../compontents/Header.tsx'
import { useEffect, useState } from 'react'
import { useProducts } from '../hooks/useProducts.tsx'
export const Home = () => {
  interface Product {
    _id: string;
    images: string[];
    new_price: number;
    old_price: number;
    name: string;
    description: string;
    category:string;
    sizes: string[];
    available: boolean;
  }
  const url = "http://localhost:3000"

  const [products, setProducts] = useState([]);

   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch(`${url}/products?limit=8`);
         const data = await response.json();
         setProducts(data.products);
         console.log(data); // Aquí deberías loguear `data` en lugar de `fetchData`
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     };
  
     fetchData();
   }, [url])
  return (
    <>
    <Header></Header>
      <main>
      <Link to={'/mujeres'}><img src={bannerWomen} alt="" /></Link>
      <section className='flex justify-around my-10 '>
            <div className='flex flex-col gap-2'>
              <h3 className='text-2xl text-center'>Hombres</h3>
              
              <Link to='/hombres' ><img className='w-44 rounded-full' src={manimg} alt="" /></Link>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-2xl text-center'>Mujeres</h3>
              
              <Link to='/mujeres' ><img className='w-44 rounded-full' src={cardImg} alt="" /></Link>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='text-2xl text-center'>Niños</h3>
              <Link to='/niños' > <img className='w-44 rounded-full' src={kidimg} alt="" /></Link>
            </div>
          </section>
      <Link to={'/hombres'}><img src={bannerMan} alt="" /></Link>
      <h2 className='text-center my-6 text-4xl'>Más vendido esta semana!</h2>
        
    <section className=' mx-6 place-items-center grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
          {products.map((product:Product) =>{
            console.log(product);
            
            return (
              <div key={product._id} className='flex flex-col gap-2 my-10 place-items-center' >
                  <h3 className='text-2xl text-center'>{product.name}</h3>
                <Link to={`/product/${product._id}`}><img className='w-60 rounded-xl' src={`${url}/images/${product.images}`} alt="" /></Link>
                <div className='flex gap-2 place-items-center'>
                  <p className='text-xl'>{product.new_price}$ </p>
                  <p className='border bg-red-500/40 text-sm text-black/60 line-through'>{product.old_price}$</p>
                </div>
              </div>
            )
          })}
      </section>
      <Link to={'/niños'}><img src={bannerKid} alt="" /></Link>
      </main>
     <Footer></Footer>
    </>
  )
}
