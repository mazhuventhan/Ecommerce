const express = require('express');
const app = express();
var mydb=require("./db")
var path = require('path'); 
var bodyParser = require('body-parser')
const fileUpload=require('express-fileupload');
// var dir = path.join(__dirname, 'images');
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(fileUpload({createParentPath:true}));
mydb.connect((err)=>{
    if(err)
    console.log('Database connection Error :'+err);
    else
    console.log('db connect')
});



const cors = require("cors");

var path = require('path'); 
const listener = app.listen(process.env.PORT || 8000, '0.0.0.0',() => {
})


app.use(cors());
app.use(express.json()); 

 
 app.use('/images', express.static('images'));

app.use(require('./modules/route'));
