var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const usersModel = require('../models/user');


router.post("/login", async function(req, res, next) {
  try {
    var { password , username } = req.body
    var user = await usersModel.findOne({
      username: username,
    })
    if (!user) {
      return res.status(500).send({
        message: "unauthorization",
        success: false
      })
    }
    var checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(500).send({
        message: "unauthorization",
        success: false
      })
    }
    var { username, password, fname, lname, nickname, age, graduated, about } = user;
    return res.status(500).send({
      data: {username,password,fname,lname,nickname,age,graduated,about},
      message: "You logedin",
      success: true
    })

  } catch(err) {
    res.status(500).send({
        message: err.message,
        success: false
    })
}
});

module.exports = router;
