const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: '0.0.0.0',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'agenda-petshop',
    insecureAuth: true
});

module.exports = conexao;