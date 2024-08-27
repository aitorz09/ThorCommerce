
import { createConnection,createPool  } from 'mysql2/promise'
import getPool from './getPool.js'
//DATABASE CONNECTION WITH MONGODB
const initDb = async () =>{
  try {
    const pool = await getPool()
    await pool.query(``)
    
  } catch (error) {
    console.log(error);
    throw error
  }
}