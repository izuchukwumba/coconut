const xlsx = require("xlsx");
const path = require("path");
const express = require("express");

const dirname = path.dirname(require.main.filename);
const filePath = path.join(dirname, "data/Colleges.xlsx");
const workbook = xlsx.readFile(filePath);

const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const jsonData = xlsx.utils.sheet_to_json(worksheet);

const colleges = [];

jsonData.forEach((row) => {
  if (row["College Name"]) {
    colleges.push(row["College Name"]);
  }
});

const router = express.Router();
router.get("/colleges", (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : "";

  if (query) {
    // Filter colleges based on the query and limit results to 100
    const filteredColleges = colleges
      .filter((college) => college.toLowerCase().includes(query))
      .slice(0, 10);
    res.json(filteredColleges);
  } else {
    // If no query, return top 50 colleges
    res.json(colleges.slice(2, 52));
  }
});

module.exports = router;
