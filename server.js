var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to DB');
});

var db_log=mongoose.model('dblog',{log_date: Date, log_val:String});
var LicT01 = mongoose.model('Lic', { name: String });
var nlic = new LicT01({ name: '!QW134' });
nlic.save(function (err) {
    if (err)
        console.log('ER0001');
})


function logdb(strlog){
	var val= new db_log({log_date:Date(),log_val:strlog});
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
	res.send('Get /logs');
})

app.listen(80, function () {
    console.log('Port 80');
});
// JavaScript source code
