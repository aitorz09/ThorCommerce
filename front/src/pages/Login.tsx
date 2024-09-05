import React from 'react'
import { Header } from '../compontents/Header'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Login = () => {
  const navigate= useNavigate();
  const handleSubmit = (e:React.FormEvent) =>{
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    const dataForm = {
      email: formValues.get('email'),
      password: formValues.get('password')
    }
    const fetchData = async () =>{
      try {
        const data = await fetch('http://localhost:3000/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataForm)
        });
        const response = await data.json();
        console.log(response);
        if(response.status === 200){
          localStorage.setItem('AUTH_TOKEN', response.token);
          toast.success('Usuario logueado con éxito');
          navigate('/');
        } else {
          toast.error('Error al iniciar sesión');
          throw new Error('Error al iniciar sesión');
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    fetchData();
  }
  return (
   <>
    <Header/>
    <main className='flex flex-col place-items-center gap-10 my-20'>
      <h2 className='text-5xl text-center'>Login</h2>
      <form onSubmit={handleSubmit} className='bg-slate-200/40 flex flex-col w-[400px] shadow-xl p-4 gap-2 rounded-xl' action="">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
    </main>
   </>
  )
}
