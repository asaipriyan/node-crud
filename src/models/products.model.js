"use strict";
var dbConn = require("../../config/mysql.config");
//Customers object create
var Customers = function (product) {
  this.product_name = product.product_name,
  this.status = product.status
};
Customers.create = function (newProduct, result) {
  dbConn.query("INSERT INTO products set ?", newProduct, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};
Customers.findById = function (id, result) {
  dbConn.query(
    "Select * from products where product_id = ? ",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};
Customers.findAll = function (result) {
  dbConn.query("Select * from products", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
Customers.update = function (id, product, result) {
  dbConn.query(
    "UPDATE products SET product_name=?, status=? WHERE product_id = ?",
    [product.name, product.status, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
Customers.delete = function (id, result) {
  dbConn.query("DELETE FROM products WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Customers;
