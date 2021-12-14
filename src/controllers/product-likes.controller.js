"use strict";
const Likes = require("../models/product-likes.model");
exports.findAll = function (req, res) {
  const product_ids = Array.isArray(req.query.product_id)
    ? req.query.product_id.join()
    : req.query.product_id;
  Likes.findAll( product_ids, function (err, user) {
    if (err) res.send(err);

    res.send(user);
  });
};
exports.create = function (req, res) {
  const newLikes = new Likes(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Likes.create(newLikes, function (err, user) {
      if (err) res.send(err);
      res.status(200).json({
        error: false,
        message: "product likes added successfully!",
        data: user,
      });
    });
  }
};
