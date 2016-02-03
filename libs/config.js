#!/usr/bin/env node
var nconf = require('nconf');

nconf.argv()
    .env()
    .file({file: './config.json'});

module.exports = nconf;