#!/usr/bin/env node
var express=require('express');
var router = express.Router();
var log=require('../libs/log')(module);

var CategoryModel = require('../libs/mongoose').CategoryModel;

router.get('/', function (req, res) {
    log.info('GET API categories')
    return CategoryModel.find(function (err, categories) {
        if (!err) {
            return res.send(categories);
        } else {
            res.statusCode = 500;
            log.error('Internal error (%d): %s', res.statusCode, err.message);
            return res.send({error:'Server error'});
        }
        
    });
});

router.post('/', function(req,res){
    log.info ('POST API categories');
    var category = new CategoryModel({
        title: req.body.title,
        author: req.body.author,
        visible: req.body.visible
    });

    category.save(function(err){
    if (!err){
        log.info("Added category");
        return res.send({status:'OK', category:category});
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

router.get('/:id', function(req,res){
   log.info('Get API Category by :id (%d)', req.params.id);
   return CategoryModel.findById(req.params.id,function(err, category){
    if (!category) {
        res.statusCode=404;
        return res.send({error:'Category not found'});
        }
    if (!err) {
        return res.send({status:'OK', category:category});
        log.debug(category);
    }else{
        res.statusCode=500;
        log.error('Internal error (%d): %s', res.statusCode, err.message);
        
        return res.send({error:'Server error'});
    }
   });
});

router.put('/:id', function (req,res){
    log.info('Put API Category by :id');
});

router.delete('/api/categories/:id', function(req,res){
    log.info('Delete API Category by :id');
});

module.exports = router;
