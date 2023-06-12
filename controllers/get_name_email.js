// const express = require("express");
const database = require("../databse");
const get_name_email = (req, res) => {
  const parent_value = req.query.parent_value;
  const query = `call project.get_name_email(${parent_value});`;
  database.query(query, (err, response) => {
    console.log(response);
    if (err) console.log(err);
    res.status(200).json(response[0]);
  });
};
module.exports = get_name_email;
