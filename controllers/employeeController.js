const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;    

const { Employee } = require('../models/employee');

router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if(!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Employees: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record With Given ID : ${req.params.id}`);

    Employee.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving Employees: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {
    const emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in Saving Employee: ' + JSON.stringify(err, undefined, 2));
        }
    });
});



router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record With Given ID : ${req.params.id}`);

    const emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in Employee Update: ' + JSON.stringify(err, undefined, 2));
        }
    });
});



router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record With Given ID : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log('Error in Employee Delete: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;
