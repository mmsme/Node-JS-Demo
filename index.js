const express = require("express");
const app = express();
const route = require("./routes");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

app.use(express.json());

app.use("/", route);

app.use("*", (req, res, next) => {
  res.status(404).json({ err: "NOT_FOUND" });
});
app.use((err, req, res, next) => {
  // Map the error and send it to user
  // instanceof
  // Check if this err is a mongoose err using instanceof

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res
      .status(422)
      .json({ statusCode: "ValidationError", property: err.keyValue });
  }
  if (err.message === "UN_AUTHENTICATED") {
    res.status(401).json({ statusCode: "UN_AUTHENTICATED" });
  }
  res.status(503).end();
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log("انت الان تستمع لراديو FM علي البورت", PORT);
});
