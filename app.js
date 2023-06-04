const database = require("./databse");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
//Getting Coordinator mobile numbers from db
app.get("/", (req, res) => {
  database.query("call project.get_mobile_number();", (err, data) => {
    database.query("call project.get_selections();", (err, data1) => {
      res.render("index", { mobile_data: data[0], select_data: data1[0] });
    });
  });
});

//for auto population
app.get("/get_data_mobile", (req, res) => {
  const parent_value = req.query.parent_value;
  const query = `call project.get_name_email(${parent_value});`;
  database.query(query, (err, response) => {
    if (err) throw res.status(404).send("Wrong Mobile Number");
    res.status(200).json(response[0]);
  });
});

// for changing child element based on parent selction

app.get("/get_data_options", (req, res) => {
  const parent_value = req.query.parent_value;
  database.query(`call project.get_options(${parent_value});`, (err, data) => {
    console.log(data[0]);
    res.json({ data: data[0] });
  });
});

app.get("/send-data", (req, res) => {
  res.redirect("/");
});

//sending input values from html to db (updating db with the inputs entered by the client)
app.post("/send-data", (req, res) => {
  console.log(req.body);
  const {
    mobile,
    chanting_type,
    chanting_subtype,
    sub_batch,
    chanting_batch,
    participants_count,
    kids_count,
    avanthi_chanted,
    chanting_date,
    google_link,
    text,
  } = req.body;
  const query = `SELECT COORDINATOR_NAME,COORDINATOR_EMAIL_ADDRESS FROM mydb.table1 WHERE COORDINATOR_MOBILE_NUMBER=${select}`;
  database.query(query, (err, response) => {
    if (err) throw err.sqlMessage;
    else {
      const sql = `insert into mydb.chanting2(coordinator_mobile_number,coordinator_email_address,coordinator_name,chanting_type,chanting_sub_type,chanting_batch,chanting_batch_number,kid_count,participant_count,aavarthi_chanted,special_notes,google_meet_link,date_time) values ('${select}','${response[0].COORDINATOR_EMAIL_ADDRESS}','${response[0].COORDINATOR_NAME}','${chanting_type}','${chanting_subtype}','${chanting_batch}','${sub_batch}','${kids_count}','${participants_count}','${avanthi_chanted}','${text}','${google_link}','${chanting_date}')`;
      database.query(sql, (err, data) => {
        if (err) {
          throw err;
        }
        console.log("inserted into table");
      });
      res.redirect("/");
    }
  });
});

app.listen(3001, () => {
  console.log("Listening on port 3000");
});
