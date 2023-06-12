const database = require("../databse");
const get_mobile = (req, res) => {
  database.query("call project.get_mobile_number();", (err, data) => {
    database.query("call project.get_selections();", (err, data1) => {
      database.query("call project.get_batches();", (err, data2) => {
        res.render("index", {
          mobile_data: data[0],
          select_data: data1[0],
          batch_opt: data2[0],
          errors: "",
        });
      });
    });
  });
};
module.exports = get_mobile;
