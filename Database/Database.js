"use strict";
/**
 * Simple database insertion and query for MongoDB
 * @author: Jirka Dell'Oro-Friedl
 */
const Mongo = require("mongodb");
console.log("Database starting");
let databaseURL = "mongodb://Nadia:12345@ds064649.mlab.com:64649/eia2-nadia";
let db;
let students;
if (process.env.NODE_ENV == "production")
    databaseURL = "mongodb://Nadia:12345@ds064649.mlab.com:64649/eia2-nadia";
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db;
        students = _db.collection("students");
    }
}
function insert(_doc) {
    students.insertOne(_doc, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
function findSingle(_matrikel, _callback) {
    var cursor = students.find(_matrikel); //so ab�ndern, dass nur einer gefunden wird --> matrikel
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}
exports.findSingle = findSingle;
function findAll(_callback) {
    var cursor = students.find();
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}
exports.findAll = findAll;
//# sourceMappingURL=Database.js.map