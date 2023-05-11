let  mysql=require("mysql")
let connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'newdata1'
})
module.exports=connection
