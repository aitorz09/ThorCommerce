import React, { useEffect, useState } from 'react'
import Footer from '../compontents/Footer'
import {Header} from '../compontents/Header.tsx'

import bannerMan from '../assets/banner_mens.png'
import { Link } from 'react-router-dom'

export const Mujeres = () => {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:3000";
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/products/category/Women`);
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
      <Header/>
        <main>
        <Link to={'/hombres'}><img src={bannerMan} alt="" /></Link>
          <h2 className='text-5xl my-10 text-center'>Mujeres</h2>
          <section className=' mx-6 place-items-center grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
          {products.map((product:Product) =>{
            return (
              <div key={product._id} className='flex flex-col gap-2 my-10 place-items-center' >
                  <h3 className='text-xl text-center text-wrap'>{product.name}</h3>
                  <Link to={`/product/${product._id}`}><img className='w-60 rounded-xl' src={`${url}/images/${product.images}`} alt="" /></Link>
                <div className='flex gap-2 place-items-center'>
                  <p className='text-xl'>{product.new_price}$ </p>
                  <p className='border bg-red-500/40 text-sm text-black/60 line-through'>{product.old_price}$</p>
                </div>
              </div>
            )
          })}
          </section>
        </main>
      <Footer/>
    </>
  )
}
