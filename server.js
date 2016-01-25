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

app.get('/', function (req, res) {
    var val= new db_log({log_date=Date(),log_val='Get /'});
	res.send('UGApp Server started<br>');
});
app.get('/lic', function (req, res) {
    res.send('UGApp Server lic port');
});
app.post('/lic', function (req, res) {
    res.send('POST data 1');
});

app.listen(80, function () {
    console.log('Port 80');
});
// JavaScript source code
