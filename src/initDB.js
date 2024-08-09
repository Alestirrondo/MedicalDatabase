const mysql = require('mysql');

function newConn(){
    let connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: 'se3309_pharmacy_database'
    
    });
    return connect;
}

module.exports = newConn;