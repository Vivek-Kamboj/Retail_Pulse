const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = 4000;
app.use(express.json());

app.use("/api/submit", routes.submit);
app.use("/api/status", routes.status);

app.get("*", function (req, res) {
  res.send("404 Error");
});

app.listen(PORT, function () {
  console.log("Server running successfully");
});
