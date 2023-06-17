const database = require("../databse");
const { validationResult } = require("express-validator");
const send_data = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    database.query("call project.get_mobile_number();", (err, data) => {
      database.query("call project.get_selections();", (err, data1) => {
        database.query("call project.get_batches();", (err, data2) => {
          res.render("index", {
            mobile_data: data[0],
            select_data: data1[0],
            batch_opt: data2[0],
            errors: errors.mapped(),
          });
        });
      });
    });
  }
  if (errors.mapped().chanting_date === undefined) {
    const {
      mobile,
      chanting_type,
      chanting_sub_type,
      chanting_sub_batch,
      chanting_batch,
      participants_count,
      kids_count,
      avanthi_chanted,
      chanting_date,
      google_link,
      text,
      location,
    } = req.body;
    const query = `call project.get_name_email(${mobile});`;
    database.query(query, (err, response) => {
      if (err) {
        throw err.sqlMessage;
      } else {
        const query1 = "call project.get_last_id();";
        database.query(query1, (err, response1) => {
          let email = response[0][0].coordinator_email_address;
          let fName = response[0][0].coordinator_first_name;
          let sName = response[0][0].coordinator_second_name;
          let id = response1;
          if (err) throw err.sqlMessage;
          else {
            const d = new Date();
            const time = d.toLocaleString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });
            const sql = `call project.addDb('${++id[0][0]
              .ATTENDANCE_ID}','${email}', '${sName} ${fName}','${mobile}',"${location}",'${avanthi_chanted}','${kids_count}','${participants_count}','${text}','${google_link}','${chanting_date}','${time}','${chanting_batch}','${chanting_sub_batch}','${chanting_type}','${chanting_sub_type}','abc'); `;
            database.query(sql, (err, data) => {
              if (err) {
                return res.send(err.sqlMessage);
              }
            });
          }
        });
      }
    });
    res.redirect("/");
  }
};
module.exports = send_data;
