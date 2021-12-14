"use strict";
var dbConn = require("../../config/mysql.config");
//Customers object create
var Likes = function (like) {
  this.user_id = like.user_id;
  this.product_id = like.product_id;
};
Likes.create = function (newLike, result) {
  dbConn.query("INSERT INTO product_likes set ?", newLike, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Likes.findAll = function (product_id, result) {
  let query =
    "SELECT pl.product_id, p.product_name, c.name, c.email, c.phone  FROM product_likes pl JOIN customers c ON pl.user_id = c.user_id JOIN products p ON pl.product_id = p.product_id WHERE 1=1";

  if (product_id) {
    query += ` AND pl.product_id IN (${product_id})`;
  }

  dbConn.query(query, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      const products = {};
      const data = [];
      if (res.length) {
        for (let pro of res) {
          products[pro.product_id] = {
            product_id: pro.product_id,
            product_name: pro.product_name,
          };
        }

        for (let obj of Object.values(products)) {
          const product = {
            ...obj,
            likes: res
              .map((x) => {
                if (obj.product_id === x.product_id) {
                  return {
                    name: x.name,
                    email: x.email,
                    phone: x.phone,
                  };
                }
              })
              .filter(Boolean),
          };
          data.push(product);
        }
      }
      result(null, data);
    }
  });
};

module.exports = Likes;
