import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool for MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'desa_banjarejo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to test DB connection gracefully
export const testDbConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database connected successfully to:', process.env.DB_NAME || 'desa_banjarejo');
    connection.release();
    return true;
  } catch (error) {
    console.warn('⚠️ Warning: Database connection failed or database not initialized yet.');
    console.warn('   Details:', error.message);
    console.warn('   (Backend server will stay running, but DB queries require MySQL running with schema.sql imported)');
    return false;
  }
};

export default pool;
