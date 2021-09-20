const fs = require("fs");
const csv = require("csv-parser");

const readData = (dataFile, cb) => {
  let results = [];
  fs.createReadStream(dataFile)
    .on("error", (err) => console.log("Error:", err.message))
    .pipe(csv())
    .on("data", (csvData) => {
      csvData.first_resolved_at = csvData.first_resolved_at.split("UTC").join("UT")
      results.push(csvData);
    })
    .on("end", () => {
      cb(results);
    });
};

readData("./data.csv", (results) => {
  const content = `exports.results = ${JSON.stringify(results)};`;
  fs.writeFile("./netlify/functions/results.js", content, 'utf-8', (err) => {
    if (err) {
      console.error("Could not write to json:", err);
    } else {
      console.log("Success");
    }
  });
});
