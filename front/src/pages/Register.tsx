import React from 'react'
import { Header } from '../compontents/Header'
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"
import { toast } from 'react-toastify';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
export const Register = () => {
  const navigate = useNavigate();
  const url = "http://localhost:3000";
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    const dataForm = {
      name: formValues.get('name'),
      email: formValues.get('email'),
      password: formValues.get('password'),
      adress: formValues.get('adress'),
      city: formValues.get('city'),
      country: formValues.get('country'),
      postalCode: formValues.get('postalCode'),
      phone: formValues.get('phone')
    }
    const fetchData = async () =>{
      try {
        const data = await fetch(`${url}/register`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataForm)
        });
        const response = await data.json();
        toast.success('Usuario registrado con éxito');
        navigate('/login')
      } catch (error) {
        toast.error('Error al registrar el usuario');
        console.log('Error fetching data:', error);
        
      }
    }
    fetchData();
  }
  

  return (
    <>
    <Header/>
    <main className='flex flex-col place-items-center gap-10 my-20 '>
      <h2 className='text-5xl'>Register</h2>
      <form onSubmit={handleSubmit} className='bg-slate-200/40 flex flex-col w-[400px] shadow-xl p-4 gap-2 rounded-xl' action="">
        <label htmlFor="name">Name</label>
        <input className='border rounded-lg' type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>
        <input className='border rounded-lg' type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input className='border rounded-lg' type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input className='border rounded-lg' type="password" name="confirmPassword" id="confirmPassword" />
        <label htmlFor="adress">Adress</label>
        <input className='border rounded-lg' type="text" name="adress" id="adress" />
        <label htmlFor="city">City</label>
        <input className='border rounded-lg' type="text" name="city" id="city" />
        <label htmlFor="country">Country</label>
        <input className='border rounded-lg' type="text" name="country" id="country" />
        <label htmlFor="postalCode">Postal Code</label>
        <input className='border rounded-lg' type="text" name="postalCode" id="postalCode" />
        <label htmlFor="phone">Phone</label>
        <input className='border rounded-lg' type="text" name="phone" id="phone" />
        <button className='bg-green-300/20 hover:bg-green-500/40 transition-all hover:text-white rounded-lg my-4 mx-auto px-4 py-2' type="submit">Register</button>
      </form>
    </main>
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
  )
}
