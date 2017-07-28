var express = require('express');
var Wrouter = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://huzaifa:1234@ds153652.mlab.com:53652/mytasklist_huzaifa',['wishlist']);


Wrouter.get('/wishlist', function(req,res,next){
    db.wishlist.find(function(err,wish){
        if(err){
            res.send(err);
        }
        res.json(wish);

    });
});

Wrouter.get('/wish/:id',function(req,res,next){
    db.wishlist.findOne({_id: mongojs.ObjectID(req.params.id)},function(err,wish){
        if(err){
            res.send(err);
        }
        res.json(wish);
    });
});

Wrouter.post('/wish', function(req,res,next){
    var wish = req.body;
    console.log(wish);
    if(!(wish.iWish)||!(wish.WishDone+' ')||!(wish.wishStarted+' ') || (wish.secondsDone != 0)||!(wish.isActive+' ')){
        res.status(400);
        res.json({"error":"bad data"});
    }
    else{
        db.wishlist.save(wish,function(err,wish){

            if(err){
                res.send(err)
            }
            res.json(wish);
        });
    }
});

Wrouter.delete('/wish/:id',function(req,res,next){
    db.wishlist.remove({_id: mongojs.ObjectID(req.params.id)},function(err,wish){
            if(err){
                res.send(err);
            }
            res.json(wish);
    });
});

Wrouter.put('/wish/:id',function(req,res, next){

    var updtWish = {};
    var wishSent = req.body;

    if(wishSent.iWish){
        updtWish.iWish = wishSent.iWish;
    }
    if(wishSent.WishDone){
        updtWish.WishDone = wishSent.WishDone;
    }
    if(wishSent.wishStarted){
        updtWish.wishStarted = wishSent.wishStarted;
    }
    if(wishSent.secondsDone){
        updtWish.secondsDone = wishSent.secondsDone;
    }
    if(wishSent.isActive){
        updtWish.isActive = wishSent.isActive;
    }
    if(!wishSent){
        res.status(400);
        res.json("error","bad data");
    }
    else{
        db.wishlist.update({_id: mongojs.ObjectID(req.params.id)},updtWish,{},function(err,wish){
            if(err){
                res.send(err);
            }
            res.json(wish);
        });
    }


});
module.exports = Wrouter;
