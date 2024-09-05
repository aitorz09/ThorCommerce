
import { Link } from 'react-router-dom'
import thorimg4 from "../assets/thorlogo.png"
import { useContext } from 'react';
import { AuthContext } from '../context/auth/auth.context';
export const Header = () => {
  const { currentUser, logout, token } = useContext(AuthContext);
  console.log(currentUser);
  
  return (
    <header className='flex justify-around shadow-xl'>
        <Link to={`/`}><img className='max-w-44' src={thorimg4} alt="" /></Link>
        <section className='flex place-items-center'>
        <svg className=' sm:hidden text-4xl mx-6' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18H3v-2h18v2Zm0-5H3v-2h18v2Zm0-5H3V6h18v2Z"/></svg>          <nav>
            <ul className="hidden sm:flex gap-6 text-lg place-items-center">
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/"}>Productos</Link></li>
              <li><Link to={"/"}>Más vendido</Link></li>
              {
                currentUser ? (
                  <>
                    <li><Link to={"/profile"}>Profile</Link></li>
                    <li><Link to={"/"} onClick={logout}>Logout</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to={"/register"}>Register</Link></li>
                    <li><Link to={"/login"}>Login</Link></li>
                  </>
                )
              }
              <li><Link to={"/carrito"}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16"><path fill="#000000" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607L1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2a1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2"/></svg></Link></li>
            </ul>
          </nav>
        </section>
      </header>
  )
}
