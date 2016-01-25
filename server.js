var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('UGApp Server started<br>');
});
app.get('/lic', function (req, res) {
    res.send('UGApp Server lic port');
});

app.listen(80, function () {
    console.log('Port 80');
});
// JavaScript source code
