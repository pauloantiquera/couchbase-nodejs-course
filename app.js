var express = require('express');
var bodyParser = require('body-parser');

var lab2Module = require('./modules/lab2');
var lab3Module = require('./modules/lab3');

var app = express();
var port = process.env.port || 3000;

app.use(bodyParser.json());

app.use('/lab2', lab2Module());
app.use('/lab3', lab3Module());

app.listen(port, function(err){
    console.log("customer360 running on port:", port);
});
