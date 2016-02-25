//// ▶▶ require objects ◀◀ ////
var bodyParser = require('body-parser');
var db = require('../schema/db');
var user=require('../schema/model/user');

var myBucket=require('../schema/db');
//// ▶▶ application/json parser ◀◀ ////
var jsonParser = bodyParser.json();

//// ▶▶ application/x-www-form-urlencoded parser ◀◀ ////
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

    //// ▶▶ enable cors ◀◀ ////
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    //// ▶▶ user add new user ◀◀ ////
    app.post('/api/user/create',jsonParser, function(req,res){
        console.log("body:"+JSON.stringify(req.body))
       
        user.createAndSave(req.body.firstName,req.body.lastName,req.body.email,req.body.phone,
            function(err,done){
                if(err){
                    res.status=400;
                    res.send(err.toString());
                    return;
                }
                res.status=201;
                res.send(done);
                return;
            });
    });

    //// ▶▶ user find one◀◀ ////
    app.get('/api/user/findOne/:id',function(req,res) {
        user.findByID(req.params.id,function(err,data){
            if (err) {
                res.status = 400;
                res.send(err);
                return;
            }
        
                res.status = 202;
                res.send(data);
                return;
            
        });
    });

    //// ▶▶ user generic find ◀◀ ////
    app.get('/api/user/find',function(req,res) {
            user.find(req.query, function (err, done) {
                if (err) {
                    res.status = 400;
                    res.send(err);
                    return;
                }
                res.status = 202;
                res.send(done);
            });
    });

    app.put('/api/user/update/:id',function(req,res){
        user.findByID(req.params.id,function(err,res){
            console.log("res:"+JSON.stringify(res));
            if (err) {
                res.status = 400;
                res.send(err);
                return;
            }
            else {
                user.replace({'res.firstName':"xxxx"},function(err,result){
                    if (err) {
                        res.status = 400;
                        res.send(err);
                        return;
                    }
                    else {
                        res.status = 202;
                        res.send(result);  
                    }
                })
            }
        })
    })
}



