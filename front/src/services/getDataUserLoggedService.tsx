import { jwtDecode } from 'jwt-decode'
import React from 'react'

export const getDataUserLoggedService = ({token})=> {
  if(!token) throw new Error('Token is required');
 const decoded = jwtDecode(token);
 console.log(decoded);
  return decoded;
 
}
