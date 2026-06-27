const mysql = require('mysql2/promise');

const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;

//pool.getConnection()
//  .then(() => console.log('✅ Conectado a la base de datos'))
//  .catch(err => {
//    console.error('❌ Error conectando a la base de datos:', err);
//    process.exit(1);
//  });

module.exports = { host, database };
