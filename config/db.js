const mysql = require('mysql2/promise');

const host = process.env.DB_HOST;
const user = process.env.DB_USER;

//pool.getConnection()
//  .then(() => console.log('✅ Conectado a la base de datos'))
//  .catch(err => {
//    console.error('❌ Error conectando a la base de datos:', err);
//    process.exit(1);
//  });

module.exports = { host, user };
