#!/usr/bin/env node
var log=require('./log')(module);
var CurrencyModel = require('../libs/mongoose').CurrencyModel;
var CurrencyExchModel = require ('../libs/mongoose').CurrencyExchModel;

var update_currency_exch = function () {
    log.info('Starting Update Currency Exch');
    var currincies=CurrencyModel.find({});
    var n=currincies.count({});
    log.info('Currencies consist %d items', n);
    return 0;
};

module.exports = update_currency_exch;