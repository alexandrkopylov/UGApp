#!/usr/bin/env node
var mongoose=require('mongoose');
var log=require('./log')(module);
var config=require('./config')(module);

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error',function(err){
   log.error('Connection to database error',err.message);
});

db.once ('open', function callback(){
    log.info("Connected to database");
});

var Schema=mongoose.Schema;

var Category = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    visible: { type: Boolean, default: true },
    modified: { type: Date, default: Date.now }
});

Category.path('title').validate(function (v){
    return v.length >2 && v.length <50;
});

var CategoryModel = mongoose.model('Category', Category);

module.exports.CategoryModel = CategoryModel;