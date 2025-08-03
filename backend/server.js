const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connectDb = require("./config/connectionDb");
const path = require("path");
connectDb();
app.use(cors());

app.use(express.json()); // <-- Middleware to parse JSON
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
