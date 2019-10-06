var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('todo', ['tasks']);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/tasks', function(req, res) {
    db.tasks.find(function(err, data) {
        res.json(data);
    });
});

// curl -X POST localhost:8000/tasks -d "subject=subject"
app.post('/tasks', function(req, res) {
    var subject = req.body.subject;
    db.tasks.insert({ subject, status: 0 }, function(err, data) {
        res.json(data);
    });
});

// curl -X PUT localhost:8000/tasks/[id] -d status=1
app.put('/tasks/:id', function(req, res) {
    var id = req.params.id;
    var status = parseInt(req.body.status);

    db.tasks.update(
        { "_id": mongojs.ObjectId(id) },
        { $set: { status } },
        { "multi": false },
        function(err, data) {
            res.json(data);
        }
    );
});

// curl -X DELETE localhost:8000/tasks/5d99b08d81e73f5a7ae78db7
app.delete('/tasks/:id', function(req, res) {
    var id = req.params.id;
    db.tasks.remove({ "_id": mongojs.ObjectId(id) }, function(err, data) {
        res.json(data);
    });
});

app.get('/tasks/:id', function(req, res) {
    var id = req.params.id;
    db.tasks.find({ "_id": mongojs.ObjectId(id) }, function(err, data) {
        res.json(data);
    });
});

app.listen(8000, function() {
    console.log('API server running at 8000');
});
