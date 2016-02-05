#!/usr/bin/env node
var log=require('./log')(module);
var http=require('http');
var iconv=require('iconv-lite');
var xml2js = require('xml2js');


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
    var exchdata='';
    var parser = new xml2js.Parser();
    //Request CBR.ru
    var req=http.request(paramcbr, function(res){
        log.info('STATUS:' +res.statusCode);
        log.info('HEADERS:' + JSON.stringify(res.headers));
        res.on('data', function (chunk){
            res.setEncoding('utf8');
            //log.info('BODY:' + chunk);
            xmlstr=iconv.decode(chunk, 'win1251');
            log.info('BODY:'+xmlstr);
            parser.parseString(xmlstr, function(err,res){
                exchdata=result['ValCurs']['Valute']['NumCode']['CharCode'];
                log.info(exchdata);
            })
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