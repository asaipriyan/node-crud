"use strict";
const Product = require("../models/products.model");
exports.findAll = function (req, res) {
  Product.findAll(function (err, user) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", user);
    res.send(user);
  });
};
exports.create = function (req, res) {
  const newProduct = new Product(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Product.create(newProduct, function (err, user) {
      if (err) res.send(err);
      res.status(200).json({
        error: false,
        message: "product added successfully!",
        data: user,
      });
    });
  }
};
exports.findById = function (req, res) {
  Product.findById(req.params.id, function (err, user) {
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
    Product.update(
      req.params.id,
      new Product(req.body),
      function (err, user) {
        if (err) res.send(err);
        res.status(200).json({ error: false, message: "Product successfully updated" });
      }
    );
  }
};
exports.delete = function (req, res) {
  Product.delete(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json({ error: false, message: "Product successfully deleted" });
  });
};
