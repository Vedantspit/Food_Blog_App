const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connectDb = require("./config/connectionDb");
const path = require("path");
const chatbotRoutes = require("./routes/chatbot");

connectDb();

app.use(cors());
app.use(express.json()); // <-- Middleware to parse JSON

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("Hello World from FoodBlog Backend 🚀");
// });

// app.use(
//   "/public/images",
//   express.static(path.join(__dirname, "public/images"))
// );

app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));
app.use("/api", chatbotRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
