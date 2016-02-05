#!/usr/bin/env node
var mongoose=require('mongoose');
var log=require('./log')(module);
var config=require('./config');
var ObjectId = mongoose.Schema.Types.ObjectId;

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

var Expense=new Schema({
   value:{type: Number, default: 0},
   account_id: {type: ObjectId, require:true},
   user_id:{type:ObjectId, require:true},
   category_id: {type: ObjectId, require:false},
   currency_id:{type:ObjectId, require:true},
   date:{type: Date, default: Date.now}
});

var ExpenseModel = mongoose.model('Expense', Expense);

var CurrencyExch=new Schema({
   date:{type:Date, default:Date.now},
   exch:{type:Number, require:true}
});
var Currency=new Schema({
   name:{type:String},
   short_name:{type:String, require:true},
   exch_to_RUB: [CurrencyExch],
   modified:{type:Date, default:Date.now}
   });

var CurrencyExchModel=mongoose.model('CurrencyExch', CurrencyExch);
var CurrencyModel = mongoose.model('Currency', Currency);

module.exports.CategoryModel = CategoryModel;
module.exports.ExpenseModel = ExpenseModel;
module.exports.CurrencyModel = CurrencyModel;
module.exports.CurrencyExchModel=CurrencyExchModel;
