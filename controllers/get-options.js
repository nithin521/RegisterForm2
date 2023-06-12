const database = require("../databse.js");
const get_options = (req, res) => {
  const parent_value = req.query.parent_value;
  database.query(`call project.get_options(${parent_value});`, (err, data) => {
    res.json({ data: data[0] });
  });
};
module.exports = get_options;
