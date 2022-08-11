import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const user = 'postgres';
const password = process.env.POSTGRES_PASSWORD;
const host = 'localhost';
const port = 5432;
const database = 'Linkr';

const connection = new Pool({
  user,
  password,
  host,
  port,
  database
});



// DB HEROKU

// const databaseConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// }

// const connection = new Pool(databaseConfig);

export default connection;
