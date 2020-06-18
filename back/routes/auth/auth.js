const express = require("express");
const connection = require("../../helpers/db");
const router = express.Router();

router.post("/signup", function (req, res, next) {
  const formData = req.body;
  connection.query("INSERT INTO users SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
