const database = require("./databse");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { check } = require("express-validator");

const get_name_email = require("./controllers/get_name_email");
const get_options = require("./controllers/get-options");
const get_mobile = require("./controllers/get_mobile");
const send_data = require("./controllers/send_data");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

//Getting Coordinator mobile numbers from db
app.get("/", get_mobile);

//for auto population
app.get("/get_data_mobile", get_name_email);

// for changing child element based on parent selction

app.get("/get_data_options", get_options);

//sending input values from html to db (updating db with the inputs entered by the client)

app.post(
  "/",
  [
    check("mobile")
      .notEmpty()
      .withMessage("Mobile Number is Required")
      .isLength({ min: 10, max: 10 })
      .withMessage("Number must be of 10 digits"),
    check("chanting_date").notEmpty().withMessage("Select date and time"),
    check("chanting_sub_batch").notEmpty().withMessage(" Cannnot be empty"),
    check("chating_date").notEmpty().withMessage("Select a date and time"),
    check("participants_count")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isLength({ min: 1, max: 8 })
      .withMessage("Range is between 1 and 8"),
    check("kids_count")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isLength({ min: 1, max: 8 })
      .withMessage("Range is between 1 and 8"),
    check("avanthi_chanted")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isLength({ min: 1, max: 8 })
      .withMessage("Range is between 1 and 8"),
    check("location")
      .notEmpty()
      .isAlpha()
      .withMessage("Location must be of alphabets ")
      .isLength({ min: 3 })
      .withMessage("Name must be of 3 characters"),
    check("google_link")
      .notEmpty()
      .withMessage("Link cant be empty & Must be a url")
      .isURL()
      .withMessage("Link must be a url"),
  ],
  send_data
);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port 3000");
});
