const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connectDb = require("./config/connectionDb");

connectDb();

app.use(express.json()); // <-- Middleware to parse JSON
app.use("/recipe", require("./routes/recipe"));

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
