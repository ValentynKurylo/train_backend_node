const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'train',
    host: 'localhost'
})

module.exports = connection.promise()