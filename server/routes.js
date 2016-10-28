'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');  // write files
var path = require('path');

// mongoose models
var Record = require('./models/record');
var Player = require('./models/player');

/**
 * GET /records
 * GET /records/12 - Retrieves a specific ticket
 * POST /tickets - Creates a new ticket
 * PUT /tickets/12 - Updates ticket #12
 * DELETE /tickets/12 - Deletes ticket #12
 */
router.get('/records', function (req, res) {
    Record.find({}, function(err, records) {
        if (err) {
            res.status(404).send('Not found');
        }
        res.json(records);
    });
 });

 router.get('/records/:id', function (req, res) {
     var id = req.params.id;
     Record.findById(id, function(err, record) {
         if (err) {
             res.status(404).send('Not found');
         }
         res.json(record);
     });
 });

 router.post('/records', function (req, res) {
     var record = req.body;
     Record.create(record, function(err, record) {
         if (err) {
             throw err;
         }
         res.json(record);
     });
 });

 router.delete('/records/:id', function (req, res) {
     var id = req.params.id;
     Record.remove({_id: id}, function(err, record) {
         if (err) {
             throw err;
         }
         res.json(record);
     });

 });

 //
 // router.put('/users/:id', function (req, res) {
 //     var id = req.params.id;
 //     var user = req.body;
 //
 //     var update = {
 //         username: user.username,
 //         group: user.group
 //     };
 //     User.findOneAndUpdate({_id: id}, update, function(err, user) {
 //         if (err) {
 //             throw err;
 //         }
 //         res.json(user);
 //     });
 // });
 //
 // router.delete('/users/:id', function (req, res) {
 //     //console.log("trying to delete user!");
 //     var id = req.params.id;
 //
 //     User.remove({_id: id}, function(err, user) {
 //         if (err) {
 //             throw err;
 //         }
 //         res.json(user);
 //     });
 //
 // });

 router.get('/players', function (req, res) {
     Player.find({}, function(err, players) {
         if (err) {
             res.status(404).send('Not found');
         }
         res.json(players);
     });
  });

  router.get('/players/:id', function (req, res) {
      var name = req.params.id;
      Player.findById(name, function(err, player) {
          if (err) {
              res.status(404).send('Not found');
          }
          res.json(player);
      });
  });

  router.post('/players', function (req, res) {
      var player = req.body;
      Player.create(player, function(err, player) {
          if (err) {
              throw err;
          }
          res.json(player);
      });
  });

  router.delete('/players/:id', function (req, res) {
      var id = req.params.id;
      Player.remove({_id: id}, function(err, player) {
          if (err) {
              throw err;
          }
          res.json(player);
      });

  });

module.exports = router;
