var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var Models = require('./models');
var bodyParser = require('body-parser');
var port = process.env.port || 3001;

app.use(express.static(__dirname + "/src"));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.listen(port, function() {
    console.log('App listening on port ' + port);
    console.log("open http://localhost:" + port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addTodo", (req, res) => {

    console.log("app.post called");
    console.log(req.body, req.body.todo, req.body.userName);
    var userData = new Models.userModel({
        userName: req.body.userName,
        todo: req.body.todo
    });

    userData.save(function(error) {
        if (error) {
            console.error(error);
        } else {
            console.log("user data has been saved");
        }
        mongoose.connection.close();
    });
});

app.get('/fetchUserData', function(req, res) {
    var userName = req.query.userName;
    var responseObj;
    Models.userModel.find({ userName: userName }, function(err, todo) {
        if (err) {
            res.status(500).send();
        } else {
            if (user.length == 0) {
                res.status(404).send(responseObj);
            } else {
                responseObj = todo;
                res.send(responseObj);
            }
        }
    });
});