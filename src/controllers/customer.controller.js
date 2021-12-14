"use strict";
const Customer = require("../models/customers.model");
exports.findAll = function (req, res) {
  Customer.findAll(function (err, user) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", user);
    res.send(user);
  });
};
exports.create = function (req, res) {
  const newUser = new Customer(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Customer.create(newUser, function (err, user) {
      if (err) res.send(err);
      res.status(200).json({
        error: false,
        message: "customer added successfully!",
        data: user,
      });
    });
  }
};
exports.findById = function (req, res) {
  Customer.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.status(200).json(user);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Customer.update(
      req.params.id,
      new Customer(req.body),
      function (err, user) {
        if (err) res.send(err);
        res.status(200).json({ error: false, message: "Customer successfully updated" });
      }
    );
  }
};
exports.delete = function (req, res) {
  Customer.delete(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json({ error: false, message: "Customer successfully deleted" });
  });
};
