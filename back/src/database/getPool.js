import mysql from 'mysql2/promise';

import {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
} from '../../env.js';
import { createConnection } from 'mysql2';

let pool;
const getPool = async () =>{
  try {
    if(!pool){
      const temporalPool = mysql.createConnection({
        host:MYSQL_HOST,
        user:MYSQL_USER,
        password:MYSQL_PASSWORD
      })
    }
    await temporalPool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`)
    pool = mysql.createPool({
      host:MYSQL_HOST,
        user:MYSQL_USER,
        password:MYSQL_PASSWORD,
        database:MYSQL_DATABASE
    })
    return await pool
  } catch (error) {
    console.log(error);
    throw error
  }
}

export default getPool;
