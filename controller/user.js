const userModel = require('../models/userModel');
const User = userModel.User;
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    let user = new User(req.body);
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.password = hash;
    user
      .save()
      .then((doc) => {
        let message = "Created Succesfully";
        res.status(201).json({ doc, message });
      })
      .catch((err) => {
        console.log(err);
        let message;
        if (err.code === 11000 && err.keyPattern.email) {
          message = "Email Already Exists";
          res.status(400).json({ err, message });
        } else {
          message = "Can Not Create";
          res.status(400).json({ err, message });
        }
      });
  };