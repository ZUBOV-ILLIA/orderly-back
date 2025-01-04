import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8mb4',
    });

    console.log('Connected to the MySQL database!');

    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

const db = await connectToDatabase();

export default db;
