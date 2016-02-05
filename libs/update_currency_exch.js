#!/usr/bin/env node
var log=require('./log')(module);
var http=require('http');
var iconv=require('iconv-lite');


var cbr_post_data='date_req=05.02.2016';
var paramcbr = {
    hostname:'www.cbr.ru',
    path: '/scripts/XML_daily.asp',
    port:80,
    method: 'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':cbr_post_data.length
    }
};


var CurrencyModel = require('../libs/mongoose').CurrencyModel;
var CurrencyExchModel = require ('../libs/mongoose').CurrencyExchModel;

var update_currency_exch = function () {
    log.info('Starting Update Currency Exch');
    var currincies=CurrencyModel.find({});
    var n=currincies.count({});
    var xmlstr='';
    //Request CBR.ru
    var req=http.request(paramcbr, function(res){
        log.info('STATUS:' +res.statusCode);
        log.info('HEADERS:' + JSON.stringify(res.headers));
        res.on('data', function (chunk){
            res.setEncoding('utf8');
            //log.info('BODY:' + chunk);
            xmlstr=iconv.encode(chunk, 'win1251');
            log.info('BODY:'+xmlstr);
        });
    });
    req.on('error', function(err){
        log.error('Problem with request:'+ err.message);
    });
    req.write(cbr_post_data);
    req.end();
    
    //log.info(n);
    //log.info('consist %d items', n);
    return 0;
};

module.exports = update_currency_exch;