var express = require('express');
var router = express.Router();
var userModel = require('../Models/Users');

/* GET home page. */
router.get('/', function(req, res, next) { // Added comma here
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add', function(req, res, next) {
  var bodydata = {
    uname: req.body.txt1,
    umobile: req.body.txt2,
    uemail: req.body.txt3,
    upassword: req.body.txt4
  };

  var mydata = new userModel(bodydata); // Changed to `new userModel`
  mydata.save(req.body)
  .then(data=>{
    res.send("Add")
  })
  .catch(err=>{
    console.log("error in query"+err);
    res.status(500).send("Error in saving data");
  });
});

router.get('/display', function(req, res, next) {
  userModel.find()
    .then(data => {
      console.log(data);
      res.render('Display', { mydata: data });
    })
    .catch(err => {
      console.log("Error" + err);
      res.status(500).send("Error fetching data");
      
    });
  });   

router.get('/show/:id', function(req, res, next) {
  var myid = req.params.id;
  userModel.findById(myid)
    .then(data => {
      res.render('show', { mydata: data });
    })
    .catch(err =>{
      console.log("Error" + err);
      res.status(500).send("Error fetching user");
    });
  })

router.get('/delete/:id',function(req,res,next){
  var myid = req.params.id;
  userModel.findByIdAndDelete(myid)
    .then(data => {
      res.redirect('/display');
    })
    .catch(err =>{
      console.log("Error" + err);
      res.status(500).send("Error deleting user");
    });
});

router.get('/edit/:id',function(req,res,next){
  var myid = req.params.id; 
  res.send("id is"+myid)
  .then(data=>{
    res.render('edit',{mydata:data});
  })
  .catch(err=>{
    console.log("error"+err);
    res.status(500).send("Error fetching user details foe editing");
  });
});

router.post('/edit/:id',function(req,res,next){
  var myid = req.params.id; 
  var mydata={
    uname:req.body.txt1,
    umobile:req.body.txt2,
    uemail:req.body.txt3

  };

  userModel.findByIdAndUpdate(myid,mydata)
  .then(()=>{
    res.redirect('/display'); 
  })
  .catch(err=>{
    console.log("erroe"+err);
    res.status(500).send("Error updating user details");
});
});
module.exports = router;
