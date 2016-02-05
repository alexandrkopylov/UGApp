var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api_route_categories=require('./routes/api_route_categories');
var api_route_expenses=require('./routes/api_route_expenses');
var log=require('./libs/log')(module);
var config=require('./libs/config');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    log.info('GET core server/');
	res.send('UGApp Server started<br>'+config.get('version'));
});


app.use('/api/categories',api_route_categories);
app.use('/api/expenses',api_route_expenses);


app.listen(config.get('port'), function () {
    log.info('Server listening on port'+config.get('port'));
});
// JavaScript source code
