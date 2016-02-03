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

module.exports = router;
