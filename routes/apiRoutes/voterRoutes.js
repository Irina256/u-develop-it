const express = require("express");
const router = express.Router();
const db = require("../../db/database");
const inputCheck = require("../../utils/inputCheck");
router.get("/voters", (req, res) => {
  const sql = `SELECT * FROM voters ORDER BY last_name`;
  const params = [];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
});

router.get("/voter/:id", (req, res) => {
  const sql = `SELECT * FROM voters WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: row,
    });
  });
});

router.post("/voter", (req, res) => {
  const errors = inputCheck(req.body, "first_name", "last_name", "email");

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;
  const params = [req.body.first_name, req.body.last_name, req.body.email];

  db.query(sql, params, function (err, data) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: req.body,
      id: this.lastID,
    });
  });
});
router.put("/voter/:id", (req, res) => {
  // Data validation
  const errors = inputCheck(req.body, "email");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  // Prepare statement
  const sql = `UPDATE voters SET email = ? WHERE id = ?`;
  const params = [req.body.email, req.params.id];

  // Execute
  db.query(sql, params, function (err, data) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: req.body,
      changes: this.changes,
    });
  });
});
router.delete("/voter/:id", (req, res) => {
  const sql = `DELETE FROM voters WHERE id = ?`;

  db.query(sql, req.params.id, function (err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }

    res.json({ message: "deleted", changes: this.changes });
  });
});
module.exports = router;
