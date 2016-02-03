var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api_category_route=require('./routes/api_route_categories');
var log=require('./libs/log')(module);
var config=require('./libs/config');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    log.info('Get /');
	res.send('UGApp Server started<br>v.0.0.1');
});
app.get('/lic', function (req, res) {
    log.info('Get /lic');
	res.send('UGApp Server lic port');
});
app.post('/lic', function (req, res) {
   log.info('POST /lic');
	res.send('1');
});

app.use('/api/categories',api_category_route);

app.listen(config.get('port'), function () {
    log.info('Server listening on port'+config.get('port'));
});
// JavaScript source code
