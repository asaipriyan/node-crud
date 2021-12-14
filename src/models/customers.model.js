"use strict";
var dbConn = require("./../../config/mysql.config");
//Customers object create
var Customers = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.phone = user.phone;
};
Customers.create = function (newUser, result) {
  dbConn.query("INSERT INTO customers set ?", newUser, function (err, res) {
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
    "Select * from customers where user_id = ? ",
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
  dbConn.query("Select * from customers", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
Customers.update = function (id, user, result) {
  dbConn.query(
    "UPDATE customers SET name=?, email=?,phone=? WHERE user_id = ?",
    [user.name, user.email, user.phone, id],
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
  dbConn.query("DELETE FROM customers WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Customers;
