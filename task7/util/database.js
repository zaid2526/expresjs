// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'root'
// });

// module.exports = pool.promise();

/*-------  with squelize  --------*/

const Sequelize=require('sequelize');

const sequelize= new Sequelize('node-complete','root','root',{
    host:'localhost',
    dialect:'mysql'
});
module.exports=sequelize;