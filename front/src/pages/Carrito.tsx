import React, { useEffect, useState } from 'react';
import { Header } from '../compontents/Header';
import Footer from '../compontents/Footer';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const Carrito = () => {
  const [cart, setCart] = useState<Cart[]>([]); // Ahora `cart` es un array
  const [total, setTotal] = useState(0);
  const url = "http://localhost:3000";
  
  interface Product {
    _id: string;
    images: string[];
    new_price: number;
    old_price: number;
    name: string;
    description: string;
    category: string;
    sizes: string[];
    available: boolean;
  }

  interface Cart {
    product: Product;
    number: number;
    selectedSize: string | null;
  }

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const data: Cart[] = JSON.parse(savedCart); // Parsear como un array
      setCart(data);
      
      // Calcular el total sumando todos los productos
      const totalCost = data.reduce((acc, item) => acc + (item.number * item.product.new_price), 0);
      setTotal(totalCost);
    }
  }, []);

  const removeItem = (productId: string, selectedSize: string | null, number: number) => {
    // Filtra el carrito para excluir el elemento que coincida con el productId, tamaño seleccionado y cantidad
    const updatedCart = cart.filter(
      (item) => !(item.product._id === productId && item.selectedSize === selectedSize && item.number === number)
    );
  
    // Actualiza el estado del carrito y el localStorage
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    // Recalcula el costo total
    const totalCost = updatedCart.reduce(
      (acc, item) => acc + item.number * item.product.new_price,
      0
    );
    setTotal(totalCost);
  };
  
  // const handleSubmit =async (e)=>{
  //   e.preventDefault()
  //   Toastify({
  //     text: "Compra realizada con éxito",
  //     duration: 3000,
  //     gravity: "top",
  //     position: 'center',
  //     backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  //   }).showToast();
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${url}/create-payment-intent`,{
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({amount: total})
  //       })
  //       if(!response){
  //         toast.error('Error al procesar el pago')
  //         throw new Error('Error al procesar el pago')
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData()
  //   localStorage.removeItem('cart');
  //   setCart([]);
  //   setTotal(0)
  // }

  return (
    <>
      <Header />
      <main className='my-10 flex flex-col gap-10 mx-auto lg:w-[1000px] border rounded-xl p-5 w-[350px]'>
      <h2 className='relative text-5xl text-center border-b my-4'>Carrito</h2>
        <div  className="flex gap-4 place-items-center justify-end border w-fit rounded-xl">
          <Link to={`/config/${total}`} className=' bg-green-300/70 p-1 rounded-lg'>Proccesar pago</Link>
          <p className='px-2'>Total: {total}$</p>
        </div>
        <section className='lg:grid lg:grid-cols-2 gap-6 flex flex-col '>
          {cart.length > 0 ? (
            cart.map((item) => (
              <section key={item.product._id} className='flex gap-6 text-sm hover:scale-105 transition-all hover:shadow-xl hover:p-4 rounded-xl shadow-sm'>
                <img className='w-32  rounded-lg hover:shadow-xl' src={`${url}/images/${item.product.images[0]}`} alt={item.product.name} />
                <div className='flex flex-col gap-2  max-w-[250px]'>
                  <h3 className='text-wrap'>{item.product.name}</h3>
                  <p>Precio unidad: {item.product.new_price}$</p>
                  <p>Tamaño seleccionado: {item.selectedSize}</p>
                  <p>Cantidad: {item.number}</p>
                  <p>Total: {item.product.new_price * item.number}$</p>
                  <button
                  onClick={() => removeItem(item.product._id, item.selectedSize, item.number)}
                  className='bg-red-600/20'
                >
                  Eliminar producto
                </button>
                </div>
              </section>
            ))
          ) : (
            <p>No se han encontrado productos en tu carrito.</p>
          )}
        </section>
       
      </main>
      <Footer />
    </>
  );
};
