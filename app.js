var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
require('./routes/routes')(app);

app.listen(4000);
console.log("App running in localhost 4000");






