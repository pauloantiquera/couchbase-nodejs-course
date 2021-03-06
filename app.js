var express = require('express');
var bodyParser = require('body-parser');

var lab2Module = require('./modules/lab2');
var lab3Module = require('./modules/lab3');
var lab4Module = require('./modules/lab4');
var lab5Module = require('./modules/lab5');

var app = express();
var port = process.env.port || 3000;

app.use(bodyParser.json());

app.use('/lab2', lab2Module());
app.use('/lab3', lab3Module());
app.use('/lab4', lab4Module());
app.use('/lab5', lab5Module(app));

app.listen(port, function(err){
    console.log("customer360 running on port:", port);
});
