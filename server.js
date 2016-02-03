var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var log=require('./libs/log')(module);
var CategoryModel = require('./libs/mongoose')(module).CategoryModel;


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

app.get('/api/categories', function (req, res) {
    return CategoryModel.find(function (err, categories) {
        if (!err) {
            return res.send(categories);
        } else {
            res.statusCode = 500;
            log.error('Internal error (%d): %s', res.statusCode, err.message);
            return res.send({error:'Server error'});
        }
        
    });
});

app.post('/api/categories', function(req,res){
    log.info ('POST /api/categories');
    var category = new CategoryModel({
        title: req.body.title,
        author: req.body.author,
        visible: req.body.visible
    });

    category.save(function(err){
    if (!err){
        log.info("Added category");
        return res.send({status:'OK', category:category});
    } else {
    log.error(err.message);
        console.log(err);
        if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
        } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
        }
        log.error('Internal error (%d): %s', res.statusCode, err.message);
        }
});
});

app.get('/api/categories/:id', function(req,res){
   log.info('Get /api/categories/:id');
});

app.put('/api/categories/:is', function (req,res){
    log.info('Put /api/categories/:id');
});

app.delete('/api/categories/:id', function(req,res){
    log.info('Delete /api/categories/:id');
});


app.listen(80, function () {
    console.log('Port 80');
});
// JavaScript source code
