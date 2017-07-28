var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://huzaifa:1234@ds153652.mlab.com:53652/mytasklist_huzaifa',['tasks']);


router.get('/tasks',function(req,res,next){
    db.tasks.find(function(err, task){
        if(err){
            res.send(err)
        }
        res.json(task);

    });
});

router.get('/tasks/:id',function(req,res,next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err)
        }
        res.json(task);

    });
});
router.post('/task',function(req,res,next){
    var task = req.body;
    if(!task.title || !(task.isDone +' ')){
            res.status(400);
            res.json({"error":"bad data"});
    }
    else{
            db.tasks.save(task, function(err, task){
                if(err){
                    res.send(err);
                }
                res.json(task);
            });
    }
});

router.delete('/task/:id',function(req,res,next){
      db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err)
        }
        res.json(task);

    });
});

router.put('/task/:id',function(req,res,next){
var task = req.body;
var updTask = {};

if(task.title){
    updTask.title = task.title;
}
if(task.isDone){
    updTask.isDone = task.isDone;
}
if(!updTask){
    res.status(400);
    res.json({"error":"bad data"});
}
else{
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask,{},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
}

});
module.exports = router;
