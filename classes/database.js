const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
<<<<<<< HEAD
  // Connects to the database and returns the connection object
  async connect() {
    try {
      const connection = await mysql.createConnection({
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_pass,
        database: process.env.db_name,
        port: process.env.db_port,
      });
      console.log('Database connected successfully!');
      return connection;
    } catch (error) {
      console.error('Error connecting to database:', error.message);
      throw error;
=======
    async connect() {
        console.log(process.env.db_host); // Should print your database host
        const connection = await mysql.createConnection({
            host: process.env.db_host,
            user: process.env.db_user,
            password: process.env.db_pass,
            database: process.env.db_name,
            port: process.env.db_port
        });

        return connection;
>>>>>>> b484132 (Add Express server setup and API endpoints; remove example .env file)
    }
  }

<<<<<<< HEAD
  // Executes a query on the database and returns the result
  async getQuery(sql, params) {
    let connection;
    try {
      connection = await this.connect();
      const [rows] = await connection.execute(sql, params);
      console.log('Query executed successfully:', sql);
      return rows;
    } catch (error) {
      console.error('Error executing query:', error.message);
      throw error;
    } finally {
      if (connection) {
        await connection.end();  // Close the connection after the query
      }
=======
    async getQuery(sql, params) {
        const connection = await this.connect();
        const [ rows ] = await connection.execute(sql, params);

        return rows;
>>>>>>> b484132 (Add Express server setup and API endpoints; remove example .env file)
    }
  }
}

<<<<<<< HEAD
module.exports = Database;
=======
module.exports = Database;
>>>>>>> b484132 (Add Express server setup and API endpoints; remove example .env file)
