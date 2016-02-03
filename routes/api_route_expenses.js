#!/usr/bin/env node
var express=require('express');
var router = express.Router();
var log=require('../libs/log')(module);
var ExpenseModel = require('../libs/mongoose').ExpenseModel;