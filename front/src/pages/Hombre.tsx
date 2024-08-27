import React, { useEffect, useState } from 'react'
import Footer from '../compontents/Footer'
import {Header} from '../compontents/Header.tsx'

import bannerKid from '../assets/banner_kids.png'
import { Link } from 'react-router-dom'

export const Hombre = () => {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:3000";
  interface Product {
    id: number;
    images: string;
    new_price:number;
    old_price:number;
    name:string;
    description:string;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/products/category/Man`);
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
        <Link to={'/niños'}><img src={bannerKid} alt="" /></Link>
          <h2 className='text-5xl my-10 text-center'>Hombres</h2>
          <section className=' mx-6 place-items-center grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
          {products.map((product:Product) =>{
            return (
              <div key={product.id} className='flex flex-col gap-2 my-10 place-items-center' >
                  <h3 className='text-xl text-center text-wrap'>{product.name}</h3>
                <img className='w-60 rounded-xl' src={`${url}/images/${product.images}`} alt="" />
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
