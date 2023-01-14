const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const TestFunctions = require("../controllers/testFunctions");
const testFunctions = new TestFunctions();

router.get("/test", async function (req, res) {
  try {
    var data = await testFunctions.testFunction();
    res.json(data);
  } catch (error) {
    console.log("API Endpoint error");
    console.log(error);
    res.json({ success: false, error: "Error Occured" });
  }
});

// router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({ user: req.user });
// })

module.exports = router;
