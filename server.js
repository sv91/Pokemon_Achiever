// Set up ======================================================================
var express         = require('express');
var app             = express();
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

// Configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/pokemon');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended':'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// Defining models =============================================================
// API -----------------------------------------------------------------------
    // Needed functions ........................................................
    // HandleError
    // Manage what to do in case of errors.
    function HandleError(err, res){
      res.send(err);
    }

    // findAll
    // Get all the element from a model
    //    target : Model from where the data should be get.
    function findAll(res,target){
      target.find(function(err, tar){
        if(err)
          HandleError(err,res);
        res.json(tar);
      });
    };

    // findOne
    // Get one of the element from a model by getting the id through route params.
    //    target : Model from where the data should be get.
    function findOne(req,res,target){
      target.findOne({
        _id : req.params.target_id
      },function(err, tar){
        if(err)
          HandleError(err,res);
        res.json(tar);
      });
    };

    // deleteOne
    // Delete an element from a model by getting the id through route params.
    //    target : Model wher the element should be deleted.
    function deleteOne(req,res,target){
      target.remove({
        _id : req.params.target_id
      }, function(err, tar) {
        if (err)
          HandleError(err,res);
        res.json(tar);
      });
    };


  // Capture -------------------------------------------------------------------
  var Capture = mongoose.model('Capture', {
    id      : Number,
    game    : String,
    seen    : Boolean,
    capture : Boolean,
    shiny   : Boolean
  });
  // Get all
  app.get('/api/capture', function(req, res){
    findAll(res, Capture);
  });

  // Get one
  app.get('/api/capture/:target_id', function(req, res){
    findOne(req,res, Capture);
  });

  // Create new Project
  app.post('/api/capture', function(req, res){
    Capture.create({
      id      : req.body.id,
      game    : req.body.game,
      seen    : req.body.seen,
      capture : req.body.capture,
      shiny   : req.body.shiny
    }, function(err,project){
      if (err)
        HandleError(err,res);
      res.json(project._id);
    });
  });

  // Delete the specified element
  app.delete('/api/capture/:target_id/delete', function(req,res) {
    deleteOne(req,res,Capture);
  });

  // Application ---------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendFile('./public/index.html'); //load the single view file
  });

// Listen ======================================================================
app.listen(63003);
console.log("App listening on port 63003.");
