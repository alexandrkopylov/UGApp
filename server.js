var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to DB');
});

var Schema = mongoose.Schema;

var Category = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    visible: { type: Boolean, default: true },
    modified: { type: Date, default: Date.now }

});

var CategoryModel = mongoose.model('Category', Category);
var db_log=mongoose.model('dblog',{log_date: Date, log_val:String});
var LicT01 = mongoose.model('Lic', { name: String });
var nlic = new LicT01({ name: '!QW134' });
nlic.save(function (err) {
    if (err)
        console.log('ER0001');
})


function logdb(strlog){
	var val= new db_log({log_date:Date(),log_val:strlog});
	console.log(strlog);
	val.save();
}
app.get('/', function (req, res) {
    logdb('Get /');
	res.send('UGApp Server started<br>v.0.0.1');
});
app.get('/lic', function (req, res) {
    logdb('Get /lic');
	res.send('UGApp Server lic port');
});
app.post('/lic', function (req, res) {
   logdb('POST /lic');
	res.send('1');
});
app.get('/logs',function(req,res){
	logdb('Get /logs');
	db_log.find();
	res.send(JSON.stringify(db_log.find()));
});

app.get('/api/categories', function (req, res) {
    return CategoryModel.find(function (err, categories) {
        if (!err) {
            return res.send(categories);
        } else {
            res.statusCode = 500;
            logdb('Internal error (%d): %s', res.statusCode, err.message);
            return res.send({error:'Server error'});
        }
        
    });
});

app.post('/api/categories', function(req,res){
    console.log(req.body)
    var category = new CategoryModel({
        title: req.body.title,
        author: req.body.author,
        visible: req.body.visible
    });

    category.save(function(err){
    if (!err){
        logdb("Added category");
        return res.send({status:'OK', category:category});
    } else {
    logdb(err.message);
        console.log(err);
        if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
        } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
        }
        logdb('Internal error (%d): %s', res.statusCode, err.message);
        }
});
});



app.listen(80, function () {
    console.log('Port 80');
});
// JavaScript source code
