var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var wishlist = require('./routes/wishlist');



var port = 3000;

var app = express();
app.set('views',path.join(__dirname,'views'));//set the views to the views folder path
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile)

//set static folder
app.use(express.static(path.join(__dirname,'client')));//all the angular stuff will go into client folder
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


app.use('/',index);
app.use('/api',tasks);
app.use('/wishlist',wishlist);





app.listen(port,function(){
    console.log("Server started on "+port);
});


