#!/usr/bin/env node
var log=require('./log')(module);
var CurrencyModel = require('../libs/mongoose').CurrencyModel;
var CurrencyExchModel = require ('../libs/mongoose').CurrencyExchModel;

var update_currency_exch = function () {
    log.info('Starting Update Currency Exch');
    var currincies=CurrencyModel.find({});
    log.info(currincies);
    log.debug('Test Debug');
    return currincies;
    /*
    return CurrencyModel.find( function (err,currency){
       if (!currency){
        res.statusCode = 404;
        return res.send ({ error: 'Not found'});
        }
        currency.exch_to_RUB.push({
            exch: 0
        });
                
        return currency.save(function (err){
            if (!err) {
                log.info('Currency Exch Updated');
                return res.send({status:'OK', currency:currency.exch_to_RUB});
            } else {
            if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);    
            }
        })
    });*/

};

module.exports = update_currency_exch;