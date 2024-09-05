import { useParams } from 'react-router-dom';
import Footer from '../compontents/Footer';
import { Header } from '../compontents/Header';
import { useEffect, useState } from 'react';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"
import { toast } from 'react-toastify';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ProductPage = () => {
  
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
  const url = "http://localhost:3000";
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [number, setNumber] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/products/${id}`);
        const data = await response.json();
        setProduct(data.product);
  
        
        console.log(product);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  const handleClick = () => {
    // Recuperar el carrito existente de localStorage
    const existingCart = localStorage.getItem('cart');
    
    let cart = [];
    
    if (existingCart) {
      // Si ya existe un carrito, lo parseamos como un array
      cart = JSON.parse(existingCart);
    }
    
    // Crear un nuevo objeto para el producto actual
    const newCartItem = { product, number, selectedSize };
    console.log(cart);
    
    // Agregar el nuevo producto al carrito existente
    cart.push(newCartItem);
    toast.success('Producto añadido al carrito')
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  const increment = () => setNumber((prev) => prev + 1);
  const decrement = () => setNumber((prev) => (prev > 0 ? prev - 1 : 0));
const tagsArray = product?.sizes[0]
console.log(tagsArray);


  return (
    <>
      <Header />
      <main className='lg:max-w-[1200px] mx-auto my-20 flex justify-around flex-col gap-6 text-center'>
        {product ? (
          <>
            <div className='lg:w-1/2 w-[350px] flex flex-col justify-between mx-auto gap-6'>
              <h2 className='lg:text-4xl text-2xl'>{product.name}</h2>
            <img
              className='h-96 rounded-xl lg:w-1/2 w-[300px] mx-auto'
              src={`${url}/images/${product.images[0]}`} // Asegurándote de acceder a la primera imagen del array
              alt={product.name}
            />
              <p className='text-black/70'>{product.description}</p>
             
              <ul className='flex gap-4 place-items-center justify-center '>
              <p>Tallas</p>
              {product.sizes.map((size) => (
                <li
                  key={size}
                  onClick={() => setSelectedSize(size)} // Actualiza el tamaño seleccionado
                  className={`cursor-pointer p-2 rounded   ${
                    selectedSize === size ? 'bg-green-800 text-white' : 'bg-gray-200'
                  }`} // Aplica clase condicionalmente
                >
                  {size.toUpperCase()}
                </li>
              ))}
            </ul>
              <section className='flex gap-6 place-items-center text-center justify-center'>
              <p className='text-2xl'>
                ${product.new_price}{' '}
                {product.old_price && (
                  <span className='line-through text-gray-500 text-lg bg-red-500/60 p-2 rounded-lg ' >
                    ${product.old_price}
                  </span>
                )}
              </p>
                <div className='flex gap-6 bg-blue-200/80 w-fit rounded-lg p-2 text-2xl'>
                  <button onClick={decrement}>-</button> 
                  <p>{number}</p>
                  <button onClick={increment}>+</button>
                </div>
              </section>
                <button  disabled={number === 0}  onClick={handleClick} className={ number >= 1 ? 'bg-orange-300/80 lg:p-2 rounded-lg text-2xl lg:px-10' : 'lg:p-2 rounded-lg lg:text-2xl px-10 bg-black/20 text-nowrap py-4'}>Add to cart</button>
            </div>
          </>
        ) : (
          <p>Loading product...</p>
        )}
      </main>
      <Footer />
      <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    </>
  );
};
