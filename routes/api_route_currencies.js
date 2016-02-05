#!/usr/bin/env node
var express=require('express');
var router = express.Router();
var log=require('../libs/log')(module);

var CurrencyModel = require('../libs/mongoose').CurrencyModel;
var CurrencyExchModel = require ('../libs/mongoose').CurrencyExchModel;
/*var Currency=new Schema({
   name:{type:String},
   short_name:{type:String, require:true},
   cource_to_RUB:[{date: {type: Date, default:Date.now}, cource:{type:Number,require:true}}],
   modified:{type:Date, default:Date.now}
   });
*/

router.get('/', function (req, res) {
    log.info('GET API Currency')
    return CurrencyModel.find(function (err, currency) {
        if (!err) {
            return res.send(currency);
        } else {
            res.statusCode = 500;
            log.error('Internal error (%d): %s', res.statusCode, err.message);
            return res.send({error:'Server error'});
        }
        
    });
});

router.post('/', function(req,res){
    log.info ('POST API currency');
    var currency = new CurrencyModel({
        name: req.body.name,
        short_name: req.body.short_name,
    });

    currency.save(function(err){
    if (!err){
        log.info("Added currency");
        return res.send({status:'OK', currency:currency});
    } else {
    log.error(err.message);
        console.log(err);
        if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
        } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
        }
        log.error('Internal error (%d): %s', res.statusCode, err.message);
        }
});
});
router.get('/update/:id', function(req,res){
    log.info ('Update Currency Exchange');
    return CurrencyModel.findById(req.params.id, function (err,currency){
       if (!currency){
        res.statusCode = 404;
        return res.send ({ error: 'Not found'});
        }
        var exch=currency.cource_to_RUB.create({
            cource: 0
        });
        exch.save();
        return currency.save(function (err){
            if (!err) {
                log.info('Currency Exch Updated');
                return res.send({status:'OK', currency:currency.cource_to_RUB});
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
    });
    });

/*router.get('/:id', function(req,res){
   log.info('Get API Category by :id (%d)', req.params.id);
   return CategoryModel.findById(req.params.id,function(err, category){
    if (!category) {
        res.statusCode=404;
        return res.send({error:'Category not found'});
        }
    if (!err) {
        return res.send({status:'OK', category:category});
        log.info('Status ok. Sending category by id');
    }else{
        res.statusCode=500;
        log.error('Internal error (%d): %s', res.statusCode, err.message);
        
        return res.send({error:'Server error'});
    }
   });
});

router.put('/:id', function (req,res){
    log.info('Put API Category by :id');
    return CategoryModel.findById(req.params.id, function (err,category){
       if (!category){
        res.statusCode = 404;
        return res.send ({ error: 'Not found'});
        }
        category.title = req.body.title;
        category.author = req.body.author;
        category.visible = req.body.visible;
        return category.save(function (err){
            if (!err) {
                log.info('Category Updated')
                return res.send({status:'OK', category:category});
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
    });
});

router.delete('/:id', function(req,res){
    log.info('Delete API Category by :id');
    return CategoryModel.findById(req.params.id,function (err,category){
        if (!category) {
            res.statusCode=404;
            log.error('Category not found');
            return res.send({error: 'Not found'});
        }
        return category.remove(function (err){
            if (!err) {
                log.info('Category removed');
                return res.send ({status:'OK'});
            }else{
                res.statusCode=500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        })
    })
});
*/
module.exports=router;