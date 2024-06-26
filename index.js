const { response } = require("express");

require("dotenv").config();
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  nodemailer = require("nodemailer");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"));
app.use(express.static(__dirname + "/images/"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/sendfeedback", (req, res) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (req.body.name.length <= 0) {
    res.send({ result: false, message: "Please Enter The Name", num: 1 });
  } else if (!re.test(req.body.email)) {
    res.send({ result: false, message: "Enter Valid Email", num: 2 });
  } else if (req.body.text.length <= 0) {
    res.send({ result: false, message: "Enter Some Text", num: 3 });
  } else {
    try {
      var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "syed.zaid98@gmail.com",
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      var mailOptions = {
        to: "syed.zaid332@gmail.com",
        subject: "Project check",
        text:
          req.body.text +
          " from " +
          req.body.name +
          " \n\n" +
          "Email id: " +
          req.body.email,
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        if (err) {
          res.send(err);
        } else {
          res.send({ result: true, message: "Message Sent Successfully" });
        }
      });
    } catch (error) {
      console.log("Error", error);
    }
  }
});

app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log("Z Blog");
});
