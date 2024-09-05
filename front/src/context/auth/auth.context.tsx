import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {JwtPayload, jwtDecode} from 'jwt-decode';
import { getDataUserLoggedService } from '../../services/getDataUserLoggedService';

// Define un tipo para el usuario decodificado del token
interface User {
  exp: number;
  email:string;
  id: string;
  // Puedes añadir otros campos según tu payload JWT
}

// Define un tipo para el contexto
interface AuthContextType {
  userLogged: User | null;
  setUserLogged: React.Dispatch<React.SetStateAction<User | null>>;
  currentUser: User | null;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
}

// Crea el contexto con un valor por defecto
export const AuthContext = createContext<AuthContextType>({
  userLogged: null,
  setUserLogged: () => {},
  currentUser: null,
  login: () => {},
  logout: () => {},
  token: null,
});

// Define el tipo para las props del proveedor
interface AuthContextProviderProps {
  children: ReactNode;
}

// Define el proveedor del contexto
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLogged, setUserLogged] = useState<JwtPayload | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('AUTH_TOKEN'));

  const login = (token: string) => {
    localStorage.setItem('AUTH_TOKEN', token);
    setToken(token);
    const user = jwtDecode<User>(token);
    console.log(user);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    setToken(null);
    setCurrentUser(null);
  };

  useEffect(() => {
    if (token) {
      const user = jwtDecode<User>(token);
      console.log(token);
      
      if (user.exp * 1000 < Date.now()) {
        logout();
        navigate('/login');
      } else {
        setCurrentUser(user);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'AUTH_TOKEN') {
        if (event.newValue) {
          const user = jwtDecode<User>(event.newValue);
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    const getDateUserLogged = async () => {
      try {
        if (token) {
          console.log(token);
          
          // Supongo que tienes un servicio para obtener datos del usuario
          const data = await getDataUserLoggedService({ token });
          console.log(data); 
          setUserLogged(data);
        }
      } catch (error) {
        console.log(error);
        logout();
      }
    };

    getDateUserLogged();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        setUserLogged,
        currentUser,
        login,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
